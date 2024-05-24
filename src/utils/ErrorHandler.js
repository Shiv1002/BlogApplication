// Errorhandler class to raise any error
// it will invoke errormiddleware
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default ErrorHandler;
