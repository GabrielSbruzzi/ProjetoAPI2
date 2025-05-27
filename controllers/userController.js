const userService = require('../service/userService');

// Listar usuários
function listar(req, res) {
  try {
    const users = userService.listar();
    res.json(users);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao listar usuários' });
  }
}

// Inserir usuário
function inserir(req, res) {
  try {
    const user = userService.inserir(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao criar usuário' });
  }
}

// Buscar usuário por ID
function buscarPorId(req, res) {
  try {
    const user = userService.buscarPorId(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (e) {
    res.status(e.id || 500).json({ msg: e.msg || 'Erro ao buscar usuário' });
  }
}

// ✅ Atualizar usuário (corrigido para async)
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
function deletar(req, res) {
  try {
    const user = userService.deletar(req.params.id);
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
  atualizar,  // <- agora é async
  deletar 
};
