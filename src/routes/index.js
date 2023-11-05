import { Router } from "express";
import userRouter from "./user.route.js";
import postRouter from "./post.routes.js";
import commentRouter from "./comment.route.js";
const router = Router();
router.use("/auth", userRouter);
router.use("/post", postRouter);
router.use("/post/comment", commentRouter);
export default router;
