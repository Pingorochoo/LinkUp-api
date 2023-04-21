import { Router } from "express";
import userRouter from "./user.route.js";
import postRouter from "./post.routes.js";
const router = Router()
router.use('/auth', userRouter)
router.use('/post', postRouter)
export default router