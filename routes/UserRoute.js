import { Router } from "express";
import {
  login,
  getProfile,
  createAccount,
  deleteAccount,
  admin,
  updateAccount,
  checkUsername,
} from "../controllers/UserController.js";
import { isOwner } from "../middlewares/isOwner.js";
const userRouter = Router();
userRouter
  .route("/login")
  .get((req, res, next) => {
    if (req.session.username) {
      return;
    }
    let toast = { ...req.flash("info")[0] };
    res.render("login", { toast: toast });
  })
  .post(login);

userRouter.get("/signup", (req, res, next) => {
  res.render("SignUp", { toast: {} });
});

userRouter.route("/profile/:id").get(getProfile, isOwner, (req, res) => {
  // console.log(res.isOwner, "isowner");
  if (res.isOwner)
    res.render("OwnerProfile", { user: res.data.user, isOwner: res.isOwner });
  else res.render("Profile", { user: res.data.user });
});

// frequeny call - high
userRouter.post("/checkusername", checkUsername);

userRouter.post("/createAccount", createAccount);

userRouter.put("/updateAccount", isOwner, updateAccount);

// deleteAcc requires email
userRouter.delete("/deleteAccount", isOwner, deleteAccount);

userRouter.route("/admin", admin);

export default userRouter;
