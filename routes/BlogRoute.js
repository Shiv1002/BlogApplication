import { Router } from "express";
import {
  getBlogs,
  updateBlog,
  postBlog,
} from "../controllers/BlogController.js";

const blogRoutes = Router();

// getAll blogs - high
// paginate based on hugelikes
blogRoutes.route("/postBlog").post(postBlog);
blogRoutes.route("/updateBlog").put(updateBlog);

export default blogRoutes;
