import { Router } from "express";
import {
  login,
  getProfile,
  createAccount,
  deleteAccount,
  updateAccount,
  checkUsername,
} from "../controllers/UserController.js";
import { isOwner } from "../middlewares/isOwner.js";
import { Blog } from "../models/BlogModel.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { uploadImage } from "../middlewares/UploadImge.js";
import { upload } from "../data/multer.js";
const userRouter = Router();
userRouter
  .route("/login")
  .get((req, res, next) => {
    if (req.session.username) {
      return res.redirect("/");
    }

    let toast = { ...req.flash("info")[0] };

    res.render("login", { toast: toast });
  })
  .post(login);

userRouter.get("/signup", (req, res, next) => {
  if (req.session.username) {
    return res.redirect("/");
  }
  res.render("SignUp", { toast: {} });
});

userRouter.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/"); // or handle the error appropriately
    }
    return res.redirect("/");
  });
});

userRouter.route("/profile/:id").get(getProfile, isOwner, async (req, res) => {
  // console.log(res.isOwner, "isowner");
  // retrive all blogs
  let allBlogs = await Blog.find({ author_id: res.data.user._id });
  if (res.isOwner)
    res.render("OwnerProfile", {
      user: res.data.user,
      blogs: allBlogs,
      isOwner: res.isOwner,
    });
  else res.render("Profile", { user: res.data.user, blogs: allBlogs });
});

// frequeny call - high
userRouter.post("/checkusername", checkUsername);

userRouter.post(
  "/createAccount",
  upload.single("image"),
  uploadImage,
  createAccount
);

userRouter.put("/updateAccount", isOwner, updateAccount);

// deleteAcc requires email
userRouter.delete("/deleteAccount", isOwner, deleteAccount);

export default userRouter;
