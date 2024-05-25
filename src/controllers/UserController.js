import crypto from "crypto";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import isEmail from "validator/lib/isEmail.js";

export const login = async (req, res, next) => {
  //sanitize inputs
  const email = String(req.body.email);
  const password = String(req.body.password);

  // empty data
  if (!email || !password) {
    return next(new ErrorHandler("Data Cannot be empty", 404));
  }

  //invalid email
  if (!isEmail(email)) {
    return next(new ErrorHandler("Invalid email", 404));
  }

  let user = await User.findOne({ email });

  // if user not exist
  if (!user) return next(new ErrorHandler("user not exist", 404));

  // password not matched
  let passMatch = await user.comparePassword(password);
  if (!passMatch) return next(new ErrorHandler("Password not matched", 404));

  if (user.role === "admin") {
    req.isAuthenticated = true;
    return res.redirect("/admin");
  }
  // redirect to home page
  console.log("redirecting");
};

export const getProfile = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);

  const user = await User.findOne({
    user_id: id,
  }).catch((e) => {
    return next(new ErrorHandler(e.message, 500));
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    success: true,
    user: user,
  });
};

export const createAccount = async (req, res, next) => {
  //   * user attributes
  //  * userid
  //  * name
  //  * email
  //  * number optional
  //  * profilephoto
  //  * username
  //  * password
  //  * likedBlogs
  //  * blogs
  //  *
  // deStruct required values
  // const { name, username, email, password, gender } = req.body;
  let username = String(req.body.username);
  let email = String(req.body.username);

  // console.log(req.body);

  // check if email or user already exist
  let user = await User.find({ username, email });
  if (user.length) {
    return next(new ErrorHandler("Account already exist", 404));
  }

  // generate random unique id of 20bytes
  let id = crypto.randomBytes(20).toString("hex");

  let new_user = await User({
    ...req.body,
    user_id: id,
    role: "user",
  });
  await new_user.save((err, user) => {
    if (err) return next(new ErrorHandler(err.message, 500));
    else
      return res.status(200).json({
        success: true,
        message: user,
      });
  });
};

export const updateAccount = (req, res, next) => {};

export const deleteAccount = async (req, res, next) => {
  // sanitize to mitigate injection attack
  const email = String(req.body.email);
  await User.deleteOne({ email })
    .then((rs) => {
      if (rs.deletedCount)
        return res.status(200).json({
          success: true,
          message: "Account successfully deleted",
        });
      else {
        return next(new ErrorHandler("No account exist", 404));
      }
    })
    .catch((e) => {
      return next(new ErrorHandler(e.message, 404));
    });
};

export const admin = (req, res, next) => {
  if (req.role !== "admin") {
    return next(new ErrorHandler("Unauthorized access", 401));
  }
  console.log("redirecting to admin");
  // res.redirect('admin')
};
