import { Router } from "express";
import {
  updateBlog,
  postBlog,
  getBlog,
  updateBlogView,
} from "../controllers/BlogController.js";
import { upload } from "../data/multer.js";
import { uploadImage } from "../middlewares/UploadImge.js";

const blogRoutes = Router();

// getAll blogs - high
// paginate based on hugelikes
blogRoutes
  .route("/postblog")
  .post(upload.single("blogImage"), uploadImage, postBlog);
blogRoutes.get("/updateblogview/:id", updateBlogView);
blogRoutes.route("/updateblog").put(updateBlog);
blogRoutes.route("/:id").get(getBlog);
export default blogRoutes;
