import cloudinary from "cloudinary";
import streamifier from "streamifier";

export const uploadImage = async (req, res, next) => {
  //   console.log(req.body, req.file, "file i got");

  try {
    // // Upload image to Cloudinary
    // console.log(req.file);
    // req.file will have buffer data
    // buffer obtain from memory storage
    const filebuffer = req.file.buffer;
    const uploadStream = (buffer) => {
      return new Promise((resolve, reject) => {
        // cloudinary object is needed for uploading
        const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    uploadStream(filebuffer)
      .then((result) => {
        // add url of image in req.body
        req.body = {
          ...req.body,
          url: result.secure_url,
        };
        // next func
        return next();
      })
      .catch((error) => {
        console.error("Error uploading to Cloudinary:", error.message);
        res.status(500).send({ error: "Error uploading file." });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
};
