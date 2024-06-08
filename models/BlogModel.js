import mongoose from "mongoose";
import { userSchema } from "./UserModel.js";
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },

    author_id: {
      type: String,
      required: true,
      immutablity: true,
    },
    publication_date: {
      type: Date,
      required: true,
      immutablity: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    views: {
      default: 0,
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
