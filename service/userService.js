const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// Listar todos os usuários
function listar() {
  return userRepository.listar();
}

// Inserir novo usuário
async function inserir(user) {
  if (
    !user || 
    typeof user.nome !== 'string' || !user.nome.trim() ||
    typeof user.email !== 'string' || !user.email.trim() ||
    typeof user.senha !== 'string' || !user.senha.trim()
  ) {
    throw { id: 400, msg: "Usuário com dados inválidos" };
  }

  // Use await aqui porque buscarPorEmail é async
  const existente = await userRepository.buscarPorEmail(user.email);
  if (existente) {
    throw { id: 409, msg: "E-mail já cadastrado" };
  }

  const hashed = await bcrypt.hash(user.senha, 10);
  const novoUsuario = {
    id: uuidv4(),
    nome: user.nome.trim(),
    email: user.email.trim(),
    senha: hashed
  };

  return userRepository.inserir(novoUsuario);
}

// Buscar por ID
async function buscarPorId(id) {
  const user = await userRepository.buscarPorId(id);
  if (!user) throw { id: 404, msg: "Usuário não encontrado" };
  return user;
}

// Buscar por e-mail
async function buscarPorEmail(email) {
  return await userRepository.buscarPorEmail(email);
}

// Atualizar usuário
async function atualizar(id, dados) {
  if (
    !dados || 
    typeof dados.nome !== 'string' || !dados.nome.trim() ||
    typeof dados.email !== 'string' || !dados.email.trim()
  ) {
    throw { id: 400, msg: "Dados inválidos para atualização" };
  }

  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  }

  const atualizado = await userRepository.atualizar(id, {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    senha: dados.senha
  });

  if (!atualizado) throw { id: 404, msg: "Usuário não encontrado" };

  return atualizado;
}


// Deletar usuário
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
