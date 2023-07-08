import Posts from "../models/postsModel.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postsMessages = await Posts.find();

    console.log(postsMessages);

    res.status(200).json(postsMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Posts(post);

  try {
    await newPost.save();
    // www.restapitutorial.com/httpstatuscodes.html
    https: res.status(201).json(newPost); // 201 successfully created
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID :(");

  const updatePost = await Posts.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.status(200).json(updatePost);
};
