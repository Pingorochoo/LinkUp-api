import { Router } from "express";
import { verifyToken } from "../middlewares/authentication.js";
import upload from "../middlewares/upload.js";
import {
  createPost,
  getFeedPost,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
const postRouter = Router();

postRouter.get("/", verifyToken, getFeedPost);
postRouter.get("/:userId", verifyToken, getUserPosts);

postRouter.post('/', verifyToken, upload.single("picture"),createPost)

postRouter.patch("/:id/like", verifyToken, likePost);

export default postRouter;
