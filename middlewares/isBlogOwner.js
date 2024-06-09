import ErrorHandler from "../utils/ErrorHandler.js";

export const isBlogOwner = (req, res, next) => {
  const { blogid } = req.params;
  // console.log(typeof res.data.user._id, typeof req.session.userid);
  // res.data.user._id object,
  // req.session.userid string
  res.isBlogOwner = req.session.userid == req.session.author_id;

  if (!res.isBlogOwner) {
    req.flash("info", { text: "unauthorised", type: "warning" });
    return res.redirect("/");
  }
  next();
};
