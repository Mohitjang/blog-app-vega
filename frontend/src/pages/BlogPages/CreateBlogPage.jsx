import React, { useState } from "react";
import { useBlogStore } from "../../store/useBlogStore";
import { useNavigate, Link } from "react-router-dom";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogImage, setBlogImage] = useState(null);

  const { createBlog, isLoading } = useBlogStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog({ title, description, blogImage });
    navigate("/"); // redirect after creation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-2xl p-8 space-y-6 relative"
      >
        <Link
          to="/"
          className="absolute top-4 right-4 text-blue-600 hover:underline text-sm"
        >
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create a New Blog
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Image
          </label>
          <input
            type="file"
            onChange={(e) => setBlogImage(e.target.files[0])}
            accept="image/*"
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
