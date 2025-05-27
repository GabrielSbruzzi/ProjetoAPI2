const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const autenticar = require('../middleware/auth');

// Rotas de tarefas
router.get('/', autenticar, controller.listar);
router.post('/', autenticar, controller.inserir);
router.get('/:id', autenticar, controller.buscarPorId);
router.put('/:id', autenticar, controller.atualizar);
router.delete('/:id', autenticar, controller.deletar);
router.get('/usuario/:userId', autenticar, controller.listarPorUsuario);

module.exports = router;
