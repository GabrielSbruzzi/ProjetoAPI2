const userService = require('../service/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
  }

  try {
    // Buscar usuário pelo email - lembrar do await!
    const user = await userService.buscarPorEmail(email);

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
      'chave-secreta', // você pode externalizar essa chave em variáveis de ambiente
      { expiresIn: '1h' }
    );

    // Retornar o token
    res.json({ token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ msg: 'Erro interno no servidor' });
  }
}

module.exports = { login };
