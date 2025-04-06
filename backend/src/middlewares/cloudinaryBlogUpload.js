import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// (Assumes cloudinary is already configured globally)

const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_images", // 👈 New folder for blogs
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1200, crop: "limit" }],
  },
});

export const uploadBlogImage = multer({ storage: blogStorage });