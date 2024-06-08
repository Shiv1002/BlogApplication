import User from "../models/UserModel.js";
import { Blog } from "../models/BlogModel.js";
import appclass from "../data/App.js";
export const admin = async (req, res, next) => {
  let visits = appclass.visits;

  let allusers = await User.find({});
  let users = [];
  let admin = {};
  // filter admin
  for (const ele of allusers) {
    if (ele.role == "admin") {
      admin = ele._doc;
    } else {
      users.push(ele._doc);
    }
  }
  let blogs = await Blog.find().sort({ publication_date: -1 }).limit(5);
  let adminBlogs = await Blog.find({ author_id: admin._id }).sort({
    publication_date: -1,
  });
  res.render("Admin", { visits, admin, users, posts: blogs, adminBlogs });
};

export const getAllPosts = async (req, res, next) => {
  let blogs = await Blog.find().sort({ publication_date: -1 });
  res.render("AllPosts", { posts: blogs });
};
export const getAllUsers = async (req, res, next) => {
  let users = await User.find();
  res.render("AllUsers", { users });
};
export const blockUser = async (req, res, next) => {
  const { id } = req.params;
  console.log("blockUser", id);
};
export const blockPost = async (req, res, next) => {
  const { id } = req.params;
  console.log("blockPost", id);
};
export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  console.log("deletePost", id);
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  console.log("deleteUser", id);
};
