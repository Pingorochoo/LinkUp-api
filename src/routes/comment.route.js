import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
  tooggleLikeDislike,
} from "../controllers/comment.controller.js";
const commentRouter = Router();
commentRouter.post("/:postId", createComment);
commentRouter.get("/getCommentBypost/:postId", getCommentsByPost);
commentRouter.patch("/like/:commentId",tooggleLikeDislike);
export default commentRouter;
