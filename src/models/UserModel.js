import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// saltround for bcrypt
let saltRounds = 10;

export const userSchema = mongoose.Schema(
  {
    user_id: {
      required: [true, "user_id is required"],
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "role is required"],
    },
    name: {
      required: [true, "name is required"],
      minLength: [3, "Name is too short"],
      maxLength: [20, "Name is too big"],
      type: String,
    },
    joined_date: {
      type: Date,
    },
    username: {
      required: [true, "username is required"],
      unique: [true, "username already Exist"],
      minLength: [3, "Name is too short"],
      maxLength: [20, "Name is too big"],
      type: String,
    },
    email: {
      required: [true, "email is required"],
      unique: [true, "email is already exist"],
      type: String,
      validator: [validator.isEmail, "Enter valid email"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      enum: ["male", "female", "others"],
    },
    password: {
      required: [true, "password is required"],
      type: String,
    },
    liked_blogs: [String],
    bookmarked_blogs: [String],
    phone_number: String,
    blogs: [String],
    profile_photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamp: true,
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
userSchema.pre("save", async function () {
  console.log("saving in database!!");

  // encrypting the password before saving
  let encPassword = await bcrypt.hash(this.password, saltRounds);

  this.password = encPassword;

  // adding join date of user
  this.joined_date = new Date();
});

userSchema.methods.comparePassword = async function (pwd) {
  let isPasswordMatch = await bcrypt.compare(pwd, this.password);
  return isPasswordMatch;
};

const User = mongoose.model("User", userSchema);

export default User;
