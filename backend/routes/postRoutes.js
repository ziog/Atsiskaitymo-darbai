const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController'); // Importuoti valdiklį

const router = express.Router();

// Maršrutai įrašams
router.route('/')
  .get(getPosts) // Gauti visus įrašus
  .post(createPost); // Sukurti naują įrašą

router.route('/:id')
  .get(getPost) // Gauti vieną įrašą pagal ID
  .put(updatePost) // Atnaujinti įrašą pagal ID
  .delete(deletePost); // Ištrinti įrašą pagal ID

module.exports = router;

