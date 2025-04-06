import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogStore } from "../../store/useBlogStore";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { blog, isLoading, error, fetchBlogById } = useBlogStore();

  useEffect(() => {
    fetchBlogById(id);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>No blog found</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <img src={blog.blogImage} alt={blog.title} width={300} />
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetailPage;
