require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

app.use('/api', userRoutes);
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;