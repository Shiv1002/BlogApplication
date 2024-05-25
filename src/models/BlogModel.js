import { Schema, model } from "mongoose";
import { userSchema } from "./UserModel";
const blogSchema = Schema({
  blog_id: String,
  auther_id: String,
  author: {
    type: userSchema,
  },
});

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
export const Blog = model("Blog", userSchema);
