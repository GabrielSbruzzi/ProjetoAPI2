const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger.json');  // Verifique o caminho correto do seu arquivo Swagger JSON

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Porta acessada: ${req.method} ${req.path}`);
    res.on('finish', () => { 
        console.log(`Status: ${res.statusCode}`);  // Log do status da resposta
    });
    next(); 
});

// Importando rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Definindo as rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Rota do Swagger (Documentação)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
