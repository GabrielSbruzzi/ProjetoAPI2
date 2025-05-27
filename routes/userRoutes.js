const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middleware/auth');

// Rotas de Usuários
router.get('/', userController.listar);
router.post('/', userController.inserir); 
router.get('/:id', userController.buscarPorId);
router.put('/:id', userController.atualizar);
router.delete('/:id', userController.deletar);

module.exports = router;
