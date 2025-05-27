const request = require('supertest');
const app = require('../app');

describe('Testes de Usuários', () => {
  it('Criação de usuário com sucesso', async () => {
    const res = await request(app)
      .post('/users')
      .send({ nome: 'Teste', email: 'teste@email.com', senha: '123456' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Falha ao criar usuário com dados incompletos', async () => {
    const res = await request(app)
      .post('/users')
      .send({ nome: '', email: 'invalido' });
    expect(res.statusCode).toEqual(400);
  });
});