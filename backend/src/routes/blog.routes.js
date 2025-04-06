import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blog.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { uploadBlogImage } from "../middlewares/cloudinaryBlogUpload.js";

const router = express.Router();

// api/blog

router.get("/", getBlogs); // all blogs
router.post("/", protectRoute,uploadBlogImage.single("blogImage"), createBlog); // Create blog
router.put("/:id", protectRoute,uploadBlogImage.single("blogImage"), updateBlog); // Update blog
router.delete("/:id", protectRoute, deleteBlog); // Delete blog
router.get("/:id", getBlogById); // blog by ID

export default router;
