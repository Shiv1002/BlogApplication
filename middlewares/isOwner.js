import ErrorHandler from "../utils/ErrorHandler.js";

export const isOwner = (req, res, next) => {
  // console.log(typeof res.data.user._id, typeof req.session.userid);
  // res.data.user._id object,
  // req.session.userid string
  res.isOwner = req.session.userid == res.data.user._id;
  next();
};
