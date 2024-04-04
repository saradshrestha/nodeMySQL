// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // for parsing application/json

// Set up Multer
const storage = multer.memoryStorage(); // Use memory storage for simplicity; adjust as needed
const upload = multer({ storage: storage });

app.use(upload.any());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', mainRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

