const User = require('../models/userModel'); // Ensure you're importing the correct model

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json(users); // Send users data back
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Retrieve user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Handle case where user doesn't exist
    }
    res.status(200).json(user); // Send user data back
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, age } = req.body; // Destructure the incoming user data

  try {
    const user = new User({ name, email, age }); // Create a new user instance
    await user.save(); // Save user to database
    res.status(201).json(user); // Send the created user back
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, // Find user by ID
      req.body, // Update with new data
      { new: true, runValidators: true } // Return the updated user and validate data
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Handle case where user doesn't exist
    }
    res.status(200).json(user); // Send the updated user back
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Delete the user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Handle case where user doesn't exist
    }
    res.status(200).json({ message: 'User deleted successfully' }); // Return success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
