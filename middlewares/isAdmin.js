import ErrorHandler from "../utils/ErrorHandler.js";
export const isAdmin = (req, res, next) => {
  if (!req.session.username) {
    req.flash("info", { text: "You have to login first", type: "danger" });
    return res.redirect("/users/login");
  }

  if (req.session.role !== "admin") {
    return next(new ErrorHandler("Unauthorized access", 401));
  }
  next();
};
