const pool = require('../db');

function mapDbUserToApi(user) {
  if (!user) return null;
  return {
    id: user.id,
    nome: user.nome,
    email: user.email
    // senha NÃO é retornada para segurança
  };
}

async function listar() {
  const result = await pool.query('SELECT id, nome, email FROM users');
  return result.rows.map(mapDbUserToApi);
}

async function inserir(user) {
  const { id, nome, email, senha } = user;
  console.log('Tentando inserir usuário:', { id, nome, email });

  const result = await pool.query(
    `INSERT INTO users (id, nome, email, senha) VALUES ($1, $2, $3, $4) RETURNING id, nome, email`,
    [id, nome, email, senha]
  );

  console.log('Usuário inserido:', result.rows[0]);
  return mapDbUserToApi(result.rows[0]);
}

async function buscarPorId(id) {
  const result = await pool.query('SELECT id, nome, email FROM users WHERE id = $1', [id]);
  return mapDbUserToApi(result.rows[0]);
}

async function buscarPorEmail(email) {
  console.log('Buscando usuário por email:', email);

  const result = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  console.log('Resultado da busca por email:', result.rows);

  return result.rows[0] || null;  // Retorna o usuário inteiro (com senha), ou null
}

async function atualizar(id, dados) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in dados) {
    fields.push(`${key} = $${idx}`);
    values.push(dados[key]);
    idx++;
  }
  values.push(id);

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, nome, email`;
  const result = await pool.query(query, values);
  return mapDbUserToApi(result.rows[0]);
}

async function deletar(id) {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, nome, email', [id]);
  return mapDbUserToApi(result.rows[0]);
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  buscarPorEmail,
  atualizar,
  deletar
};
