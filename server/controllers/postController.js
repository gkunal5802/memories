import Posts from "../models/postsModel.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postsMessages = await Posts.find();

    res.status(200).json(postsMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Posts({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    // www.restapitutorial.com/httpstatuscodes.html
    res.status(201).json(newPost); // 201 successfully created
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID :(");

  const updatePost = await Posts.findByIdAndUpdate(
    id,
    { ...post, _id: id },
    { new: true }
  );

  res.status(200).json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that Id");

  await Posts.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  // if user is not logged in
  if (!req.userId) return res.json({ message: "Unauthenticated User" });

  // if the id of user is not vaild
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that Id");

  const post = await Posts.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  // if user has not liked the post previously, then add his id to this particular post
  if (index === -1) {
    post.likes.push(req.userId);
  }
  // if user has already liked the post and want to like the post again, it will dislike the post -> i.e. remove his id from post
  else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};
