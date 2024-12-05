const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Prisijungta prie MongoDB'); // Prisijungta prie MongoDB
  } catch (error) {
    console.error(error); // Klaida
    process.exit(1); // Išeina su klaidos kodu
  }
};

module.exports = connectDB;
