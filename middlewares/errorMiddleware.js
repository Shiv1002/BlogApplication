// error handler middleware
// expects any error and its status
// returns a response
export const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  // res.status(err.statusCode).json({
  //   success: false,
  //   message: err.message,
  // })
  console.log(err.message);
  return res.redirect("/error", (err, req, res, next));
};
