const Post = require('../models/postModel');
const User = require('../models/userModel');

// Gauti visus įrašus arba įrašus pagal konkretų vartotoją
const getPosts = async (req, res) => {
  const { userId } = req.query; // Gauti userId iš užklausos parametrų

  try {
    const filter = userId ? { userId } : {}; // Jei userId egzistuoja, filtruoti pagal jį
    const posts = await Post.find(filter).populate('userId', 'name email');
    res.status(200).json(posts); // Grąžinti įrašus
  } catch (error) {
    res.status(500).json({ message: error.message }); // Klaidos pranešimas
  }
};

// Gauti vieną įrašą pagal ID
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Įrašas nerastas' }); // Įrašas nerastas
    }
    res.status(200).json(post); // Grąžinti įrašą
  } catch (error) {
    res.status(500).json({ message: error.message }); // Klaidos pranešimas
  }
};

// Sukurti naują įrašą
const createPost = async (req, res) => {
  const { title, content, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Vartotojas nerastas' }); // Vartotojas nerastas
    }

    const post = new Post({ title, content, userId });
    await post.save();
    res.status(201).json(post); // Įrašas sukurtas
  } catch (error) {
    res.status(400).json({ message: error.message }); // Klaidos pranešimas
  }
};

// Atnaujinti įrašą pagal ID
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Įrašas nerastas' }); // Įrašas nerastas
    }
    res.status(200).json(post); // Įrašas atnaujintas
  } catch (error) {
    res.status(400).json({ message: error.message }); // Klaidos pranešimas
  }
};

// Ištrinti įrašą pagal ID
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Įrašas nerastas' }); // Įrašas nerastas
    }
    res.status(200).json({ message: 'Įrašas sėkmingai ištrintas' }); // Įrašas sėkmingai ištrintas
  } catch (error) {
    res.status(500).json({ message: error.message }); // Klaidos pranešimas
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
