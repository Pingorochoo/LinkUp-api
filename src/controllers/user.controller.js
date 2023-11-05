import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
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
      occupation,
    } = req.body;
    // console.log(1, req.body);
    // console.log(firstName,
    //     lastName,
    //     email,
    //     password,
    //     picturePath,
    //     friends,
    //     location,
    //     occupation);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user does not exists." });
    const passwordMatched = user.isPasswordMatched(password);
    if (!passwordMatched)
      return res.status(400).json({ msg: "user does not exists." });
    user = { ...user._doc };
    delete user.password;
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const id = req.params.id || req.user._id;
    console.log(id);
    let user = await User.findById(id);
    user = { ...user?._doc };
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const listUsers=async(req,res)=>{
  try {
    const listUsers=await User.find()
    res.status(200).json(listUsers)
  } catch (error) {
    res.status(404).json({message:error.message})
  }
}
export const getFrindsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { friends } = await User.findById(id).populate("friends");
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id: userId, friendId } = req.params;
    const user = await User.findById(userId).populate("friends");
    const friend = await User.findById(friendId);
    if (user.friends.find((friend) => friend._id.toString() === friendId)) {
      user.friends = user.friends.filter(
        (friend) => friend._id.toString() !== friendId
      );
      friend.friends = friend.friends.filter(
        (friend) => friend._id.toString() !== userId
      );
    } else {
      user.friends.push(friend);
      friend.friends.push(user);
    }
    await user.save();
    await friend.save();
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
