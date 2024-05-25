import { Schema, model } from "mongoose";

const commentSchema = Schema({});

/**
 * comment attributes
 * blogid
 * commentid
 * header
 * replies : comment
 * likes
 * dislikes
 * reported
 *
 */
export const Comments = model("Comments", commentSchema);
