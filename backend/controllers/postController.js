const Post = require('../models/postModel');
const User = require('../models/userModel');

// Get all posts or posts by a specific user
const getPosts = async (req, res) => {
  const { userId } = req.query; // Fetch userId from query params

  try {
    const filter = userId ? { userId } : {}; // If userId exists, filter by it
    const posts = await Post.find(filter).populate('userId', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single post by ID
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { title, content, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const post = new Post({ title, content, userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
