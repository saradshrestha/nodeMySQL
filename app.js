// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');



const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());


// Routes
app.use('/api', mainRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

