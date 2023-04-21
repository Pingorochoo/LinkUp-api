import { Router } from "express";
import { verifyToken } from "../middlewares/authentication.js";
const postRouter = Router()

postRouter.get('/', verifyToken)
postRouter.get('/:userId/posts', verifyToken)

postRouter.post('/:id/like', verifyToken)

export default postRouter
