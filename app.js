const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const verifyToken = require('./middleware/auth');

app.use(express.json());

// Rotas públicas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Rotas protegidas
app.use('/tasks', taskRoutes); 

module.exports = app;
