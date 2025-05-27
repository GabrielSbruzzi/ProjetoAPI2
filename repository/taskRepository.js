// repository/taskRepository.js
let tasks = [];  // Um array simples em memória, substitua isso por um banco de dados real, se necessário

function listar() {
  return tasks;  // Retorna todas as tasks
}

function inserir(task) {
  tasks.push(task);  // Insere a tarefa no array
  return task;
}

function buscarPorId(id) {
  return tasks.find(task => task.id === id);  // Retorna uma task pelo ID
}

function atualizar(id, dados) {
  let taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  tasks[taskIndex] = { ...tasks[taskIndex], ...dados };
  return tasks[taskIndex];
}

function deletar(id) {
  let taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  const deletedTask = tasks.splice(taskIndex, 1);
  return deletedTask[0];
}

function listarPorUsuario(userId) {
  return tasks.filter(task => task.usuarioId === userId);  // Retorna tarefas de um usuário específico
}

module.exports = { 
    listar, 
    inserir, 
    buscarPorId, 
    atualizar, 
    deletar, 
    listarPorUsuario 
};
