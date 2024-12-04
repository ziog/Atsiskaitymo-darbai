require('dotenv-defaults').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes'); // Include user routes as well
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;

// Use morgan for detailed logging
app.use(morgan('dev')); // 'dev' outputs concise colored logs

// Middleware to enable CORS
app.use(cors());

app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/praktinio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use post routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/users', userRoutes); // User routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
