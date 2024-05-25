import { Router } from "express";
import {
  login,
  getProfile,
  createAccount,
  deleteAccount,
  admin,
} from "../controllers/UserController.js";

const userRouter = Router();
userRouter.post("/login", login);

userRouter.get("/:id", getProfile);

userRouter.post("/createAccount", createAccount);

userRouter.put("/updateAccount");

userRouter.delete("/deleteAccount", deleteAccount);

userRouter.route("/admin", admin);

export default userRouter;
