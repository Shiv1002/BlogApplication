import { Blog } from "../models/BlogModel.js";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import isEmail from "validator/lib/isEmail.js";
import appclass from "../data/App.js";
const setSessionUser = (user, req, res, next) => {
  req.session.userid = user._id;
  req.session.username = user.username;
  req.isAuthenticated = true;
  // console.log(req.session);
};

// const userbody = ['name', 'username', 'email', 'password', 'gender']
export const login = async (req, res, next) => {
  //sanitize inputs
  const email = String(req.body.email);
  const password = String(req.body.password);

  // empty data
  if (!email || !password) {
    return res.render("login", {
      toast: { text: "email or password cannot be empty", type: "error" },
    });
  }

  //invalid email
  if (!isEmail(email)) {
    // return next(new ErrorHandler("Invalid email", 404));
    return res.render("login", {
      toast: { text: "Invalid email", type: "error" },
    });
  }

  let user = await User.findOne({ email });

  // if user not exist
  if (!user) {
    // return next(new ErrorHandler("user not exist", 404));
    return res.render("login", {
      toast: { text: "user not exist", type: "error" },
    });
  }

  // password not matched
  let passMatch = await user.comparePassword(password);
  if (!passMatch) {
    // return next(new ErrorHandler("Password not matched", 404));
    return res.render("login", {
      toast: { text: "Password not matched", type: "error" },
    });
  }

  setSessionUser(user, req, res, next);
  if (user.role === "admin") {
    req.session.role = "admin";
    return res.redirect("/admin");
  } else {
    req.session.role = "user";
  }
  // redirect to home page
  req.flash("info", { text: "Logged In successfully!!", type: "success" });
  return res.redirect("/");
};

export const getProfile = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);

  const user = await User.findById(id).catch((e) => {
    return next(new ErrorHandler(e.message, 500));
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid ID",
    });
  }
  // console.log(JSON.stringify(user));

  // passing data to next req
  res.data = { user: user, toast: {} };

  next();
  // res.status(200).json({
  //   success: true,
  //   user: user,
  // });
};

export const checkUsername = async (req, res, next) => {
  // check if term is type of injection
  // sanitize
  let term = String(req.body.searchTerm);

  let user = await User.findOne({ username: term }).catch((e) => {
    return res.status(500).json({
      success: false,
      message: e.messag,
    });
  });
  if (user)
    return res.status(200).json({
      success: true,
      userExist: true,
    });
  return res.status(200).json({
    success: true,
    userExist: false,
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
  let email = String(req.body.email);

  // console.log(req.body, req.file);

  // check if email or user already exist
  let user = await User.find({
    $or: [{ username: username }, { email: email }],
  });
  // console.log(user);
  if (user.length) {
    return res.render("SignUp", {
      toast: { text: "Account Exist", type: "error" },
    });
  }

  let new_user = await User({
    ...req.body,
    photo: req.body.url,
    role: "user",
  });
  await new_user.save((err, user) => {
    if (err)
      return res.render("SignUp", {
        toast: { text: err.message, type: "error" },
      });
    else {
      // console.log(user);
      // set data and user
      res.data = {
        user: user,
        toast: { text: "Account created successfully!" },
      };
      // set current user session
      setSessionUser(user, req, res, next);

      return res.redirect("/login");
    }
  });

  // return next(new ErrorHandler("Something went wrong"));
};

export const updateAccount = (req, res, next) => {
  let user = {};

  // sanitize all fields
  for (let key in req.body) {
    user[key] = String(req.body[key]);
  }
};

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
