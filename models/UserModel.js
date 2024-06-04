import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// saltround for bcrypt
let saltRounds = 10;

export const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "role is required"],
    },
    name: {
      trim: true,
      required: [true, "name is required"],
      minLength: [3, "Name is too short"],
      maxLength: [20, "Name is too big"],
      type: String,
    },
    username: {
      trim: true,
      required: [true, "username is required"],
      unique: [true, "username already Exist"],
      minLength: [3, "Name is too short"],
      maxLength: [20, "Name is too big"],
      type: String,
    },
    email: {
      index: true,
      trim: true,
      immutable: [true, "email cannot change"],
      required: [true, "email is required"],
      unique: [true, "email is already exist"],
      type: String,
      validator: [validator.isEmail, "Enter valid email"],
    },
    occupation: {
      type: String,
      required: [true, "occupation is required"],
      enum: ["Professional", "Student", "Other"],
    },
    password: {
      required: [true, "password is required"],
      type: String,
    },
    blogs: [String],
    profile_photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * user attributes
 * userid
 * name
 * email
 * number optional
 * profilephoto
 * username
 * password
 * likedBlogs
 * blogs
 *
 */

// before saving data
userSchema.pre("save", async function () {
  console.log("saving in database!!");

  // encrypting the password before saving
  let encPassword = await bcrypt.hash(this.password, saltRounds);

  this.password = encPassword;
});

// make comparision method
userSchema.methods.comparePassword = async function (pwd) {
  let isPasswordMatch = await bcrypt.compare(pwd, this.password);
  return isPasswordMatch;
};

const User = mongoose.model("User", userSchema);

export default User;
