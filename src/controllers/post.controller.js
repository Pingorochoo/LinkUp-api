import Post from "../modules/post.model.js"
import User from "../modules/user.model.js"


export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            fisrtName: user.fisrtName,
            lastName: user.lastName,
            location: user.locationm,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()
        const post = await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getFeedPost = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const ggtUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const posts = await Post.find({ userId })
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)
        if (isLiked)
            post.likes.delete(userId)
        else
            post.likes.set(userId, true)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}