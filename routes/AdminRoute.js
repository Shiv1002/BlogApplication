import { Router } from "express";
import {
  admin,
  blockPost,
  blockUser,
  deletePost,
  deleteUser,
  getAllPosts,
  getAllUsers,
} from "../controllers/AdminController.js";

const adminRouter = Router();
adminRouter.get("/", admin);
adminRouter.get("/posts", getAllPosts);
adminRouter.get("/users", getAllUsers);
adminRouter.put("/block/user/:id", blockUser);
adminRouter.put("/block/post/:id", blockPost);
adminRouter.delete("/delete/post/:id", deletePost);
adminRouter.delete("/delete/user/:id", deleteUser);

export default adminRouter;
