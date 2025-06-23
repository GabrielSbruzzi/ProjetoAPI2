const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',       
  database: 'crud_produtos',
  password: '123456',
  port: 5433,             
});

// Testa conexão no startup
pool.connect()
  .then(client => {
    console.log('Conectado ao banco PostgreSQL com sucesso!');
    client.release();
  })
  .catch(err => {
    console.error('Erro ao conectar no banco PostgreSQL:', err.stack);
  });

module.exports = pool;
