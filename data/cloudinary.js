import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

let cloud = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: "BlogApp/blogs",
    format: ["jpeg", "jpg", "png"], // format can be determined dynamically, here it's fixed to 'png'
    public_id: (req, file) => {
      // console.log(file, "nyay");
      return file.originalname;
    }, // use the original file name as the public_id
  },
});
export { cloud, storage };
