import mongoose from "mongoose";
export const blogIdSchema = mongoose.Schema({
  BlogId: {
    type: String,
    required: [true, "Blog id is required"],
    immutable: true,
    unique: true,
  },
});

export const interactionSchema = mongoose.Schema(
  {
    UserId: {
      index: true,
      type: String,
      required: [true, "Blog id is required"],
      immutable: true,
      unique: true,
    },
    LikedBlogs: [blogIdSchema],
    BookmarkedBlogs: [blogIdSchema],
  },

  {
    timestamps: true,
  }
);

export const InteractionModel = mongoose.model(
  "InteractionModel",
  interactionSchema
);
