const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

function listar() {
  return userRepository.listar();
}

function inserir(user) {
  if (!user || !user.nome || !user.email || !user.senha) {
    throw { id: 400, msg: "Usuário com dados inválidos" };
  }
  
  // Criptografando a senha
  const hashed = bcrypt.hashSync(user.senha, 8);
  const novoUsuario = { id: uuidv4(), nome: user.nome, email: user.email, senha: hashed };
  
  return userRepository.inserir(novoUsuario);
}

// Função para buscar usuário por ID
function buscarPorId(id) {
  const user = userRepository.buscarPorId(id);
  if (!user) throw { id: 404, msg: "Usuário não encontrado" };
  return user;
}

// Função para buscar usuário por email (importante para o login)
function buscarPorEmail(email) {
  const user = userRepository.buscarPorEmail(email);
  if (!user) throw { id: 404, msg: "Usuário não encontrado" };
  return user;
}

// Função para atualizar um usuário
function atualizar(id, dados) {
  if (!dados || !dados.nome || !dados.email) {
    throw { id: 400, msg: "Dados inválidos para atualização" };
  }
  
  const atualizado = userRepository.atualizar(id, dados);
  if (!atualizado) throw { id: 404, msg: "Usuário não encontrado" };
  
  return atualizado;
}

// Função para deletar um usuário
function deletar(id) {
  const deletado = userRepository.deletar(id);
  if (!deletado) throw { id: 404, msg: "Usuário não encontrado" };
  
  return deletado;
}

module.exports = { 
    listar, 
    inserir, 
    buscarPorId,
    buscarPorEmail,
    atualizar, 
    deletar 
};
