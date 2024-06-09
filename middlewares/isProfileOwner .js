import ErrorHandler from "../utils/ErrorHandler.js";

export const isProfileOwner = (req, res, next) => {
  const { id } = req.params;
  // console.log(typeof res.data.user._id, typeof req.session.userid);
  // res.data.user._id object,
  // req.session.userid string
  res.isProfileOwner = req.session.userid == id;
  next();
};
