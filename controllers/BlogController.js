import { Blog } from "../models/BlogModel.js";

const blogPerPage = 10;
// getAll blogs - high
// paginate based on likes
export const getBlogs = async () => {
  let blogs = await Blog.find({});
  return blogs;
};

// search a blog - high
export const searchBlogs = async (req, res, next) => {
  let { term } = req.params;
  let blogs = await Blog.find({ term });
  console.log(blogs);
  return res.render("SearchBlog", { blogs: blogs });
};

// post a blog -  low ping
export const postBlog = async (req, res, next) => {
  // console.log("posting data");
  // console.log(req.body);
  let { blogContent, blogTitle } = req.body;
  let newBlog = new Blog({
    title: blogTitle,
    contents: blogContent,
    author: req.session.username,
    author_id: req.session.userid,
    publication_date: Date(),
  });
  await newBlog.save((err, blog) => {
    if (err) {
      // console.log(err.message);
      return res.status(500).redirect("/");
    } else {
      // console.log("data save successfully");
      req.flash("info", { text: "Posted!", type: "success" });
      return res.status(200).redirect("/");
    }
  });
};

// update a blog - very low
export const updateBlog = () => {
  let { blogid, newBlogContent } = req.body;
};
