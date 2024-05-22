require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
