import Posts from "../models/postsModel.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postsMessages = await Posts.find();

    console.log(postsMessages);

    res.status(200).json(postsMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// export const getPosts = async (req, res) => {
//   const { page } = req.query;

//   try {
//       const LIMIT = 8;
//       const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

//       const total = await PostMessage.countDocuments({});
//       const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

//       res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
//   } catch (error) {
//       res.status(404).json({ message: error.message });
//   }
// }
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Posts(post);

  try {
    await newPost.save();
    // www.restapitutorial.com/httpstatuscodes.html
    https: res.status(201).json(newPost); // 201 successfully created
  } catch (error) {
    res.status(409).json({ message: error });
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

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that Id");

  await Posts.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that Id");

  const post = await Posts.findById(id);
  const updatedPost = await Posts.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
