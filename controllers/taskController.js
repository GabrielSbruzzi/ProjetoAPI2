const taskService = require('../service/taskService');

// Listar todas as tasks
function listar(req, res) {
  try {
    const tasks = taskService.listar();  // Supondo que o serviço de tarefas retorne uma lista de tarefas
    res.json(tasks);
  } catch (e) {
    console.error('Erro ao listar tarefas:', e);
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao listar tarefas' });
  }
}

// Inserir uma nova task
function inserir(req, res) {
  try {
    const task = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      usuarioId: req.user.id  // Usando o ID do usuário do JWT
    };
    const novaTask = taskService.inserir(task);  // Envia os dados da task para o serviço
    res.status(201).json(novaTask);  // Retorna a task criada
  } catch (e) {
    console.error('Erro ao criar tarefa:', e);
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao criar tarefa' });
  }
}

// Buscar uma task pelo ID
function buscarPorId(req, res) {
  try {
    const task = taskService.buscarPorId(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
    res.json(task);
  } catch (e) {
    console.error('Erro ao buscar tarefa:', e);
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao buscar tarefa' });
  }
}

// Atualizar uma task
function atualizar(req, res) {
  try {
    const task = taskService.atualizar(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ msg: 'Tarefa não encontrada para atualizar' });
    }
    res.json(task);
  } catch (e) {
    console.error('Erro ao atualizar tarefa:', e);
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao atualizar tarefa' });
  }
}

// Deletar uma task
function deletar(req, res) {
  try {
    const task = taskService.buscarPorId(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarefa não encontrada' });

    // Verifica se o usuário é o proprietário da tarefa
    if (task.usuarioId !== req.user.id) {
      return res.status(403).json({ msg: 'Você não tem permissão para deletar esta tarefa' });
    }

    taskService.deletar(req.params.id);
    res.json({ msg: 'Tarefa deletada com sucesso' });
  } catch (e) {
    console.error('Erro ao deletar tarefa:', e);
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao deletar tarefa' });
  }
}

// Listar as tasks de um usuário específico
function listarPorUsuario(req, res) {
  try {
    const tasks = taskService.listarPorUsuario(req.params.userId);  // Supondo que o serviço tenha essa função
    res.json(tasks);
  } catch (e) {
    console.error('Erro ao listar tarefas do usuário:', e);
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao listar tarefas do usuário' });
  }
}

module.exports = { 
  listar, 
  inserir, 
  buscarPorId, 
  atualizar, 
  deletar, 
  listarPorUsuario 
};
