import jwt from 'jsonwebtoken'
import User from '../modules/user.model.js'
import dotenv from 'dotenv'
dotenv.config()
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            picture: picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'user does not exists.' })
        const passwordMatched = user.isPasswordMatched(password)
        if (!passwordMatched) return res.status(400).json({ msg: 'user does not exists.' })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const data = { ...user._doc }
        delete data.password
        console.log(data)
        res.status(200).json({ token, data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}