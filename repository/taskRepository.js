const pool = require('../db');

function mapDbTaskToApi(task) {
  return {
    id: task.id,
    nome: task.nome,
    descricao: task.descricao,
    usuarioId: task.usuario_id, 
    status: task.status
  };
}

async function listar() {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows.map(mapDbTaskToApi);
}

async function inserir(task) {
  const { id, nome, descricao, usuarioId, status } = task;
  const result = await pool.query(
    `INSERT INTO tasks (id, nome, descricao, usuario_id, status) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id, nome, descricao, usuarioId, status || 'pendente']
  );
  return mapDbTaskToApi(result.rows[0]);
}

async function buscarPorId(id) {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  if (!result.rows[0]) return null;
  return mapDbTaskToApi(result.rows[0]);
}

async function atualizar(id, dados) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in dados) {
    const column = key === 'usuarioId' ? 'usuario_id' : key;
    fields.push(`${column} = $${idx}`);
    values.push(dados[key]);
    idx++;
  }
  values.push(id);

  const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  if (!result.rows[0]) return null;
  return mapDbTaskToApi(result.rows[0]);
}

async function deletar(id) {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  if (!result.rows[0]) return null;
  return mapDbTaskToApi(result.rows[0]);
}

async function listarPorUsuario(userId) {
  const result = await pool.query('SELECT * FROM tasks WHERE usuario_id = $1', [userId]);
  return result.rows.map(mapDbTaskToApi);
}

module.exports = { 
  listar, 
  inserir, 
  buscarPorId, 
  atualizar, 
  deletar, 
  listarPorUsuario 
};
