const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const SECRET = 'segredo123';

// --- Banco "em memória" ---
const usuarios = [];
const tarefas = [];

// --- Express app ---
const app = express();
app.use(express.json());

// --- Middleware auth ---
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token inválido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Token inválido' });
    req.user = user;
    next();
  });
}

// --- Usuário Controller e Rotas ---
app.post('/users', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: 'Usuário com dados inválidos', id: 400 });
  }
  if (usuarios.find(u => u.email === email)) {
    return res.status(409).json({ msg: 'E-mail já cadastrado', id: 409 });
  }
  const hashed = await bcrypt.hash(senha, 8);
  const novoUser = { id: uuidv4(), nome, email, senha: hashed };
  usuarios.push(novoUser);

  // Retorna sem senha
  const { senha: _, ...userSemSenha } = novoUser;
  return res.status(201).json(userSemSenha);
});

app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (!user) return res.status(401).json({ msg: 'Credenciais inválidas' });

  const senhaOk = await bcrypt.compare(senha, user.senha);
  if (!senhaOk) return res.status(401).json({ msg: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// --- Tarefa Controller e Rotas ---
app.post('/tasks', authMiddleware, (req, res) => {
  const { titulo, descricao, status, userId } = req.body;

  if (!titulo || !descricao || !status || !userId) {
    return res.status(400).json({ msg: 'Tarefa com dados inválidos', id: 400 });
  }

  // Verifica se userId existe
  const userExiste = usuarios.find(u => u.id === userId);
  if (!userExiste) return res.status(400).json({ msg: 'Usuário não encontrado', id: 400 });

  const novaTask = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    userId,
  };

  tarefas.push(novaTask);
  res.status(201).json(novaTask);
});

// --- TESTES ---
// Agrupa testes relacionados a Usuários
describe('Testes de Usuários', () => {
  // Testa se um usuário é criado com sucesso com dados válidos
  it('Criação de usuário com sucesso', async () => {
    const res = await request(app)
      .post('/users')
      .send({ nome: 'Teste', email: 'teste@email.com', senha: '123456' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).not.toHaveProperty('senha'); // senha não deve ser retornada
  });

  // Testa se a criação falha ao enviar dados incompletos ou inválidos
  it('Falha ao criar usuário com dados incompletos', async () => {
    const res = await request(app)
      .post('/users')
      .send({ nome: '', email: 'invalido' });

    expect(res.statusCode).toEqual(400);
  });
});

// Agrupa testes relacionados a Tarefas
describe('Testes de Tarefas', () => {
  let token;
  let userId;

  // Executa antes de todos os testes deste bloco: cria usuário e obtém token para autenticação
  beforeAll(async () => {
    const resUser = await request(app)
      .post('/users')
      .send({ nome: 'Teste2', email: 'teste2@email.com', senha: '123456' });

    userId = resUser.body.id;

    const resLogin = await request(app)
      .post('/auth/login')
      .send({ email: 'teste2@email.com', senha: '123456' });

    token = resLogin.body.token;
  });

  // Testa se uma tarefa é criada com sucesso com dados válidos e autenticação válida
  it('Criação de tarefa com sucesso', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Tarefa 1', descricao: 'Descrição da tarefa', status: 'aberta', userId });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // Testa se a criação de tarefa falha quando os dados são inválidos (ex: falta userId)
  it('Falha ao criar tarefa com dados inválidos', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: '', descricao: '', status: 'aberta' }); // falta userId também

    expect(res.statusCode).toEqual(400);
  });
});

module.exports = app;
