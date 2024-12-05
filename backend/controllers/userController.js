const User = require('../models/userModel'); // Įsitikinkite, kad importuojate tinkamą modelį

// Gauti visus vartotojus
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Gauti visus vartotojus
    res.status(200).json(users); // Siųsti vartotojų duomenis atgal
  } catch (error) {
    res.status(500).json({ message: error.message }); // Apdoroti klaidas
  }
};

// Gauti vieną vartotoją pagal ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Gauti vartotoją pagal ID
    if (!user) {
      return res.status(404).json({ message: 'Vartotojas nerastas' }); // Tvarkyti atvejį, kai vartotojas neegzistuoja
    }
    res.status(200).json(user); // Siųsti vartotojo duomenis atgal
  } catch (error) {
    res.status(500).json({ message: error.message }); // Apdoroti klaidas
  }
};

// Sukurti naują vartotoją
const createUser = async (req, res) => {
  const { name, email, age } = req.body; // Išskaidyti gaunamus vartotojo duomenis

  try {
    const user = new User({ name, email, age }); // Sukurti naują vartotojo egzempliorių
    await user.save(); // Išsaugoti vartotoją į duomenų bazę
    res.status(201).json(user); // Siųsti sukurtą vartotoją atgal
  } catch (error) {
    res.status(400).json({ message: error.message }); // Apdoroti klaidas
  }
};

// Atnaujinti vartotoją pagal ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, // Rasti vartotoją pagal ID
      req.body, // Atnaujinti naujais duomenimis
      { new: true, runValidators: true } // Grąžinti atnaujintą vartotoją ir patikrinti duomenų galiojimą
    );

    if (!user) {
      return res.status(404).json({ message: 'Vartotojas nerastas' }); // Tvarkyti atvejį, kai vartotojas neegzistuoja
    }
    res.status(200).json(user); // Siųsti atnaujintą vartotoją atgal
  } catch (error) {
    res.status(400).json({ message: error.message }); // Apdoroti klaidas
  }
};

// Ištrinti vartotoją pagal ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Ištrinti vartotoją pagal ID

    if (!user) {
      return res.status(404).json({ message: 'Vartotojas nerastas' }); // Tvarkyti atvejį, kai vartotojas neegzistuoja
    }
    res.status(200).json({ message: 'Vartotojas sėkmingai ištrintas' }); // Grąžinti sėkmės pranešimą
  } catch (error) {
    res.status(500).json({ message: error.message }); // Apdoroti klaidas
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
