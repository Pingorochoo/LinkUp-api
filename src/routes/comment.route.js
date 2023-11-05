import { Router } from "express";
import { createComment, getCommentsByPost } from "../controllers/comment.controller.js";
const commentRouter = Router();
commentRouter.post("/:postId", createComment);
commentRouter.get('/getCommentBypost/:postId',getCommentsByPost)
export default commentRouter;
