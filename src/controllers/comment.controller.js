import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createComment = async (req, res) => {
  try {
    const { userId, parent, comment, picturePath } = req.body;
    const { postId } = req.params;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user) throw { message: "invalid userId" };
    if (!post) throw { message: "invalid postId path variable" };
    const {
      firstName,
      lastName,
      location,
      picturePath: userPicturePath,
    } = user;
    const commentUser = {
      userId,
      name: `${firstName} ${lastName}`,
      picturePath: userPicturePath,
      location,
    };
    const newComment = new Comment({
      user: commentUser,
      postId,
      parent,
      comment,
      picturePath,
    });
    await newComment.save();
    const postComments = await Comment.find({ postId });
    post.comments.push(postComments[postComments.length - 1]._id);
    await post.save();
    res.status(200).json(postComments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getComment = async (req, res) => {};
export const getCommentsByPost = async (req, res) => {
  try {
    // It is still necessary to evaluate which is better or had a better performnance
    // metod 1, get the array of coment from a post:
    const { postId } = req.params;
    const { comments } = await Post.findById(postId).populate("comments");
    const filtretComments = comments.map(
      ({ _id, comment, user, likes, picturePath, parent }) => ({
        _id,
        comment,
        user,
        likes,
        picturePath,
        parent,
      })
    );
    res.status(201).json(filtretComments);
    // metod 2 find all coments that match with an specific postId:
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateComment = async (req, res) => {};
export const deleteComment = async (req, res) => {};
export const tooggleLikeDislike = async (req, res) => {
  try {
    const { commentId, userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw { message: "invalid userId or user does not exist" };
    const comment = await Comment.findById(commentId);
    if (!comment) throw { message: "invalid commentId or not exist" };
    let isLiked = comment.likes.includes(userId);
    if (isLiked) {
      comment.likes = comment.likes.filter((id) => userId !== id.toString());
    } else {
      comment.likes.push(userId);
    }
    await comment.save();
    res.status(201).json({ isLiked, likes: comment.likes });
  } catch (error) {
    res.status(404).json({ mnessage: error.message });
  }
};
export const listLikers = async (req, res) => {};
export const getReplies = async (req, res) => {};
