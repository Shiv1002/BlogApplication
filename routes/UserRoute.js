import { Router } from "express";
import {
  login,
  getProfile,
  createAccount,
  deleteAccount,
  updateAccount,
  checkUsername,
} from "../controllers/UserController.js";
import { isProfileOwner } from "../middlewares/isProfileOwner .js";
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

userRouter
  .route("/profile/:id")
  .get(getProfile, isProfileOwner, async (req, res) => {
    // console.log(res.isOwner, "isowner");
    // retrive all blogs
    const author_id = String(req.params.id);
    let allBlogs = await Blog.find({ author_id: author_id });
    if (res.isProfileOwner)
      res.render("OwnerProfile", {
        user: res.data.user,
        blogs: allBlogs,
        isProfileOwner: res.isProfileOwner,
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

userRouter.put("/updateAccount", isProfileOwner, updateAccount);

// deleteAcc requires email
userRouter.delete("/deleteAccount", isProfileOwner, deleteAccount);

export default userRouter;
