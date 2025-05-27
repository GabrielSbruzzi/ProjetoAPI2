const request = require('supertest');
const app = require('../app');

let token;
let userId;

beforeAll(async () => {
  const res = await request(app).post('/users').send({ nome: 'Teste', email: 'task@email.com', senha: '123456' });
  userId = res.body.id;
  const login = await request(app).post('/auth/login').send({ email: 'task@email.com', senha: '123456' });
  token = login.body.token;
});

describe('Testes de Tarefas', () => {
  it('Criação de tarefa com sucesso', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Tarefa 1', descricao: 'Descrição da tarefa', status: 'aberta', userId });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Falha ao criar tarefa com dados inválidos', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: '', descricao: '', status: 'aberta' });
    expect(res.statusCode).toEqual(400);
  });
});
