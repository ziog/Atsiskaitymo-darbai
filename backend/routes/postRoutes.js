const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController'); // Import the controller

const router = express.Router();

// Routes for posts
router.route('/')
  .get(getPosts) // Get all posts
  .post(createPost); // Create a new post

router.route('/:id')
  .get(getPost) // Get a single post by ID
  .put(updatePost) // Update a post by ID
  .delete(deletePost); // Delete a post by ID

module.exports = router;
