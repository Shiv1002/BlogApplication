import { Router } from "express";
import {
  updateBlog,
  postBlog,
  getBlog,
  updateBlogView,
  getUpdateBlogPage,
} from "../controllers/BlogController.js";
import { upload } from "../data/multer.js";
import { uploadImage } from "../middlewares/UploadImge.js";
import { isProfileOwner } from "../middlewares/isProfileOwner .js";
import { isBlogOwner } from "../middlewares/isBlogOwner.js";

const blogRoutes = Router();

// getAll blogs - high
// paginate based on hugelikes
blogRoutes
  .route("/postblog")
  .post(upload.single("blogImage"), uploadImage, postBlog);
blogRoutes.get("/updateblogview/:id", updateBlogView);
blogRoutes
  .route("/updateblog/:blogid")
  .get(isBlogOwner, getUpdateBlogPage)
  .post(upload.single("blogImage"), uploadImage, updateBlog);
blogRoutes.route("/:id").get(getBlog);
export default blogRoutes;
