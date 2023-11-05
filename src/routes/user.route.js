import { Router } from "express";
import upload from "../middlewares/upload.js";
import { addRemoveFriend, getFrindsByUser, getUser, listUsers, login, register } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
const userRouter = Router()

userRouter.post('/register', upload.single("picture"), register)
userRouter.post('/login', login)

userRouter.get('/listUsers',listUsers)
userRouter.get('/:id?',verifyToken, getUser)
userRouter.get('/:id/friends', getFrindsByUser)

userRouter.patch('/:id/:friendId', verifyToken, addRemoveFriend)
export default userRouter