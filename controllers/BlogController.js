import lod from "lodash";
import { Blog } from "../models/BlogModel.js";

const blogPerPage = 10;
// getAll blogs - high
// paginate based on likes
export const getAllBlogs = async () => {
  let blogs = await Blog.find({}).sort({ publication_date: -1 });
  return blogs;
};

export const updateBlogView = async (req, res, next) => {
  let { id } = req.params;
  Blog.findByIdAndUpdate(id, { $inc: { views: 1 } }, (err, doc) => {
    if (err) {
      res.status(500).json({
        success: "failed",
        message: err.message,
      });
    } else {
      res.status(200).json({
        success: "success",
        message: "view updated",
      });
    }
  });
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
  let { blogContent, blogTitle, url } = req.body;

  let newBlog = new Blog({
    title: blogTitle,
    contents: blogContent,
    author: req.session.username,
    author_id: req.session.userid,
    publication_date: Date(),
    image_url: url,
  });
  await newBlog.save((err, blog) => {
    if (err) {
      console.log(err.message);
      //unable to save blog due to session expiring
      req.flash("info", { text: err.message, type: "error" });
      return res.status(500).redirect("/writeblog");
    } else {
      console.log("data save successfully");
      req.flash("info", { text: "Posted!", type: "success" });
      return res.status(200).redirect(blog._id);
    }
  });
};
//
export const getUpdateBlogPage = async (req, res, next) => {
  const { blogid } = req.params;
  // console.log("updating", blogid);
  const blog = await Blog.findById(blogid).catch((e) => {
    return res.render("PageNotFound", { err: e });
  });
  if (lod.isEmpty(blog)) {
    return res.render("PageNotFound", {
      err: { message: "No Such Blog exists" },
    });
  }

  return res.render("UpdateBlog", {
    blog: blog,
    toast: {},
  });
};
// update a blog - very low
export const updateBlog = async (req, res, next) => {
  const { blogTitle, blogContent, url } = req.body;
  const { blogid } = req.params;

  let newBlog = {
    title: blogTitle,
    contents: blogContent,
  };
  if (url) {
    newBlog = {
      ...newBlog,
      image_url: url,
    };
  }

  newBlog = await Blog.findByIdAndUpdate(blogid, {
    ...newBlog,
  }).catch((e) => {
    return res.render("PageNotFound", {
      err: { text: "Something went wrong" },
    });
  });

  return res.redirect(`/blogs/${blogid}`);
};

export const getBlog = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id, "search");
  const blog = await Blog.findById(id).catch((e) => {
    return res.render("PageNotFound", { err: e });
  });
  if (lod.isEmpty(blog)) {
    return res.render("PageNotFound", {
      err: { message: "No Such Blog exists" },
    });
  }
  req.flash("info");
  res.data = { blog: blog };

  const formatdate = Intl.DateTimeFormat("en-in", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "long",
  }).format(blog.publication_date);

  // const options1 = { year: 'numeric', month: 'long', day: 'numeric' }; // May 27, 2024
  // const options2 = { year: 'numeric', month: '2-digit', day: '2-digit' }; // 05/27/2024
  // const options3 = { year: 'numeric', month: 'short', day: 'numeric' }; // May 27, 2024
  req.session.author_id = blog.author_id;
  res.render("Blog", {
    blog: {
      ...blog._doc,
      publication_date: formatdate,
    },
    isBlogOwner: blog.author_id == req.session.userid,
    toast: {},
  });
};
