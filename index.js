import e from "express";
import { json } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./data/database.js";
import userRouter from "./routes/UserRoute.js";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import flash from "connect-flash";
import { getBlogs } from "./controllers/BlogController.js";
import BlogRouter from "./routes/BlogRoute.js";
import mongoSanitize from "express-mongo-sanitize";
dotenv.config();

const app = e();
const PORT = process.env.PORT || 3000;
app.use(flash());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000, //10min
    },
  })
);

app.get("/", async (req, res) => {
  console.log(req.session.username);

  // access to previous flash messages
  let toast = { ...req.flash("info")[0] };
  let blogs = await getBlogs();
  res.render("home", {
    username: req.session.username,
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

  res.render("WriteBlog", { toast: {} });
});
app.use("/blogs", BlogRouter);

app.use("/users", userRouter);

app.use("/error", (err, req, res, next) => {
  req.flash("danger", err.message);
  res.render("Error", req.flash("danger"));
});

app.use(errorMiddleware);

// connect with DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} 🔥`);
});
