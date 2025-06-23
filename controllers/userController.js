const userService = require('../service/userService');

// Listar usuários
async function listar(req, res) {
  try {
    const users = await userService.listar();
    res.json(users);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao listar usuários' });
  }
}

// Inserir usuário
async function inserir(req, res) {
  const { nome, email, senha } = req.body;

  // Validação simples dos dados
  if (!nome || !email || !senha) {
    return res.status(400).json({ id: 400, msg: "Usuário com dados inválidos" });
  }

  try {
    const user = await userService.inserir(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao criar usuário' });
  }
}

// Buscar usuário por ID
async function buscarPorId(req, res) {
  try {
    const user = await userService.buscarPorId(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao buscar usuário' });
  }
}

// Atualizar usuário
async function atualizar(req, res) {
  try {
    const user = await userService.atualizar(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado para atualizar' });
    }
    res.json(user);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao atualizar usuário' });
  }
}

// Deletar usuário
async function deletar(req, res) {
  try {
    const user = await userService.deletar(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado para deletar' });
    }
    res.json(user);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao deletar usuário' });
  }
}

module.exports = { 
  listar, 
  inserir, 
  buscarPorId, 
  atualizar,
  deletar 
};
