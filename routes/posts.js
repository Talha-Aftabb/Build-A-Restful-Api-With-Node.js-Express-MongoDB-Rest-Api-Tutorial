const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

//Get all the posts
router.get("/", async (_req, res) => {
  try {
    const getPosts = await Post.find();
    res.status(200).json(getPosts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Submit a posts
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  const post = new Post({
    title,
    description,
  });

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const getSpecificPost = await Post.findById(postId);
    res.status(200).json(getSpecificPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a specific post
router.delete("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update a specific post
router.patch("/:postId", async (req, res) => {
  try {
    const { title, description } = req.body;
    const postId = req.params.postId;
    await Post.updateOne(
      { _id: postId },
      {
        $set: {
          title,
          description,
        },
      }
    );
    res.json({ message: "Post updated successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
