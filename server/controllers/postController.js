import Posts from "../models/postsModel.js";

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
