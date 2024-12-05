const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController'); // Importuoti valdiklį

const router = express.Router();

// Maršrutai vartotojams
router.route('/')
  .get(getUsers) // Gauti visus vartotojus
  .post(createUser); // Sukurti naują vartotoją

router.route('/:id')
  .get(getUser) // Gauti vieną vartotoją pagal ID
  .put(updateUser) // Atnaujinti vartotoją pagal ID
  .delete(deleteUser); // Ištrinti vartotoją pagal ID

module.exports = router;

