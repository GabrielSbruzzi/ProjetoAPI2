const userService = require('../service/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
  }

  // Buscar usuário pelo email
  const user = userService.buscarPorEmail(email);
  if (!user) {
    return res.status(400).json({ msg: 'Credenciais inválidas' });
  }

  // Verificar a senha
  const isMatch = bcrypt.compareSync(senha, user.senha);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Credenciais inválidas' });
  }

  // Gerar o token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    'chave-secreta', // ← agora igual
    { expiresIn: '1h' }
  );
  
  // Retornar o token
  res.json({ token });
}

module.exports = { login };
