const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const verifyToken = require('./middleware/auth'); // Middleware para proteger rotas

app.use(express.json());

// Rotas públicas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Rotas protegidas (exemplo: tasks precisam de autenticação)
app.use('/tasks', verifyToken, taskRoutes);

module.exports = app;
