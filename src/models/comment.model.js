import { Schema, model } from "mongoose";
import { nonEmptyStringValidator } from "../utils/validations.js";

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    comment: {
      type: String,
      required: true,
      minlength: 1, // Agregar una longitud mínima apropiada
      validate: nonEmptyStringValidator,
    },
    picturePath: String,
    likes: [
      {
          type: Schema.Types.ObjectId,
          ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);
export default Comment;
