require('dotenv-defaults').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importuoti cors tarpinius programinius įrankius
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes'); // Įtraukti vartotojų maršrutus
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;

// Naudoti morgan detaliam žurnalo išvedimui
app.use(morgan('dev')); // 'dev' rodo trumpus spalvotus žurnalus

// Tarpinis įrankis CORS įjungimui
app.use(cors());

app.use(express.json()); // Analizuoti JSON užklausų kūnus

// Prisijungti prie MongoDB
mongoose.connect('mongodb://localhost:27017/praktinio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Prisijungta prie MongoDB')) // Prisijungta prie MongoDB
  .catch(err => console.log('MongoDB prisijungimo klaida:', err)); // MongoDB prisijungimo klaida

// Naudoti įrašų maršrutus
app.use('/api/posts', postRoutes); // Įrašų maršrutai
app.use('/api/users', userRoutes); // Vartotojų maršrutai

// Paleisti serverį
app.listen(PORT, () => {
  console.log(`Serveris veikia prievade ${PORT}`); // Serveris veikia prievade
});
