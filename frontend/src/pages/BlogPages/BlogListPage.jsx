import React, { useEffect } from "react";
import { useBlogStore } from "../../store/useBlogStore";
import { Link } from "react-router-dom";

const BlogListPage = () => {
  const { blogs, isLoading, error, fetchBlogs, deleteBlog } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id); // assuming deleteBlog is available in useBlogStore
    }
  };

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Blog List</h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create New Blog
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{blog.title}</td>
                  <td className="py-3 px-4 text-gray-600 line-clamp-2 max-w-xs">
                    {blog.description}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={blog.blogImage}
                      alt={blog.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        View
                      </Link>

                      <Link
                        to={`/blogs/${blog._id}/edit`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
