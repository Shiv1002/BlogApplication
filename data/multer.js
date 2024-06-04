import multer from "multer";
// Configure storage
const storage = multer.memoryStorage();
import ErrorHandler from "../utils/ErrorHandler.js";
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new ErrorHandler("only jpg.jpeg.png files are allowed"), false);
    }
  },
});
export { storage, upload };
