import { Schema, model } from "mongoose";
import { nonEmptyStringValidator } from "../utils/validations.js";

const commentSchema = new Schema(
  {
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      picturePath: String,
      location: String,
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
