import mongoose from "mongoose";
import { userSchema } from "./UserModel.js";
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
      unique: true,
      immutablity: true,
      index: true,
    },
    publication_date: {
      type: Date,
      required: true,
      immutablity: true,
    },
    likes: {
      type: Number,
      min: 0,
    },
    dislikes: {
      type: Number,
      min: 0,
    },
    views: {
      type: Number,
      min: 0,
    },
    contents: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * blog attributes
 * blogid
 * author
 * autherid
 * publication date
 * likes of blog
 * dislike of blog
 * views
 * contents
 *
 */
export const Blog = mongoose.model("Blog", blogSchema);
