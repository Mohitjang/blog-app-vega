import Blog from "../models/Blog.js";
import cloudinary from "../lib/cloudinary.js"; // Import Cloudinary configuration

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogImagePath = req.file?.path || null; // Get the path of the uploaded image
  console.log("Request body: ", req.body);
  console.log("Request user: ", req.user);
  try {
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.user.id) {
      return res.status(400).json({ message: "User is not authenticated" });
    }
    const newBlog = new Blog({
      title,
      description,
      blogImage: blogImagePath,
      author_id: req.user.id,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Read (Display Blog List):

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author_id", "username email");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update (Edit Blog)
export const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogImagePath = req.file?.path || null; // Get the path of the uploaded image

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (blogImagePath) {
      // i want to delete the previous image from cloudinary
      const imageUrl = blog.blogImage; // The full Cloudinary URL
      const urlParts = imageUrl.split("/");
      const fileNameWithExt = urlParts.pop(); // prcgmq3lxwortrtowb32.jpg
      const folder = urlParts.pop(); // blog_images
      const fileName = fileNameWithExt.split(".")[0]; // prcgmq3lxwortrtowb32

      const publicId = `${folder}/${fileName}`; // blog_images/prcgmq3lxwortrtowb32

      await cloudinary.uploader.destroy(publicId);
    }
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.blogImage = blogImagePath || blog.blogImage; // Update the image path if a new one is provided
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete (Delete Blog)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Display Button for Each Blog:
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author_id",
      "username email"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Display Button for Each Blog:
export const getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ author_id: req.user.id }).populate(
      "author_id",
      "username email"
    );
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
