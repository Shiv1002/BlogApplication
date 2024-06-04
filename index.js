import dotenv from "dotenv";
dotenv.config();

import e from "express";
import { json } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./data/database.js";
import userRouter from "./routes/UserRoute.js";

import session from "express-session";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import flash from "connect-flash";
import { getAllBlogs } from "./controllers/BlogController.js";
import BlogRouter from "./routes/BlogRoute.js";
import mongoSanitize from "express-mongo-sanitize";
import { upload } from "./data/multer.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import { isAdmin } from "./middlewares/isAdmin.js";
import { admin } from "./controllers/AdminController.js";
import appclass from "./data/App.js";
import adminRouter from "./routes/AdminRoute.js";
// import { storage } from "./data/cloudinary.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let webview = 0;
const app = e();
const PORT = process.env.PORT || 3000;

app.use(flash());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(e.static("./public"));
app.use(json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, //30min session
    },
  })
);

app.get("/", async (req, res) => {
  appclass.updateVisit();
  // access to previous flash messages
  let toast = { ...req.flash("info")[0] };
  let blogs = await getAllBlogs();
  res.render("home", {
    username: req.session.username,
    userid: req.session.userid,
    blogs: blogs,
    toast: toast,
  });
});
app.use(mongoSanitize());

app.use("/writeblog", (req, res, next) => {
  if (!req.session.username) {
    req.flash("info", { text: "You have to Login first!!", type: "warning" });
    return res.redirect("users/login");
  }

  res.render("WriteBlog", {
    username: req.session.username,
    toast: { ...req.flash("info")[0] },
  });
});
app.use("/blogs", BlogRouter);

app.use("/users", userRouter);

app.get("/error", (req, res, next) => {
  res.render("Error", { err: { message: req.flash("error")[0] } });
});

app.use(errorMiddleware);

// connect with DB
connectDB();

app.use("/admin", isAdmin, adminRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} 🔥`);
});
