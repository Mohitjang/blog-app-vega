import React, { useEffect } from "react";
import { useBlogStore } from "../../store/useBlogStore";
import { Link } from "react-router-dom";

const BlogListPage = () => {
  const { blogs, isLoading, error, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create New Blog
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.blogImage}
                alt={blog.title}
                className="w-60 h-40 max-w-md h-48 object-cover rounded"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {blog.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
