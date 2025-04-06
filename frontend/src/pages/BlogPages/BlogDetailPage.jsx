import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogStore } from "../../store/useBlogStore";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { blog, isLoading, error, fetchBlogById } = useBlogStore();

  useEffect(() => {
    fetchBlogById(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No blog found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>

      <img
        src={blog.blogImage}
        alt={blog.title}
        className="w-full h-auto rounded-xl mb-6 shadow-md"
      />

      <p className="text-gray-700 text-base leading-relaxed">{blog.description}</p>
    </div>
  );
};

export default BlogDetailPage;
