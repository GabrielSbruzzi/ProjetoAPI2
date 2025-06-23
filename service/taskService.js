// service/taskService.js
const taskRepository = require('../repository/taskRepository');
const { v4: uuidv4 } = require('uuid');

function listar() {
  return taskRepository.listar();  // Retorna todas as tarefas
}

function inserir(task) {
  if (!task || !task.nome || !task.usuarioId) {
    throw { id: 400, msg: "Tarefa com dados inválidos" };
  }

  const statusValidos = ['pendente', 'fazendo', 'concluída'];
  const status = task.status && statusValidos.includes(task.status) ? task.status : 'pendente';

  const novaTask = { 
    id: uuidv4(), 
    nome: task.nome, 
    descricao: task.descricao, 
    usuarioId: task.usuarioId,
    status
  };

  return taskRepository.inserir(novaTask);
}

function buscarPorId(id) {
  const task = taskRepository.buscarPorId(id);
  if (!task) throw { id: 404, msg: "Tarefa não encontrada" };
  return task;
}

function atualizar(id, dados) {
  if (!dados || (!dados.nome && !dados.descricao && !dados.status)) {
    throw { id: 400, msg: "Dados inválidos para atualização" };
  }

  const statusValidos = ['pendente', 'fazendo', 'concluída'];
  if (dados.status && !statusValidos.includes(dados.status)) {
    throw { id: 400, msg: "Status inválido" };
  }

  const atualizado = taskRepository.atualizar(id, dados);
  if (!atualizado) throw { id: 404, msg: "Tarefa não encontrada" };
  return atualizado;
}

function deletar(id) {
  const deletado = taskRepository.deletar(id);
  if (!deletado) throw { id: 404, msg: "Tarefa não encontrada" };
  return deletado;
}

function listarPorUsuario(userId) {
  return taskRepository.listarPorUsuario(userId);  // Retorna tarefas associadas a um usuário específico
}

module.exports = { 
    listar, 
    inserir, 
    buscarPorId, 
    atualizar, 
    deletar, 
    listarPorUsuario 
};