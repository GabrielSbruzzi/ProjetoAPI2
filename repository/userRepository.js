let usuarios = []; // Simulação de banco de dados

function listar() {
  return usuarios;
}

function inserir(user) {
  usuarios.push(user);
  return user;
}

function buscarPorId(id) {
  return usuarios.find(user => user.id === id);
}

function buscarPorEmail(email) {
  return usuarios.find(user => user.email === email);  // Buscar usuário pelo email
}

function atualizar(id, dados) {
  const userIndex = usuarios.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  usuarios[userIndex] = { ...usuarios[userIndex], ...dados };
  return usuarios[userIndex];
}

function deletar(id) {
  const userIndex = usuarios.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  return usuarios.splice(userIndex, 1)[0];
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  buscarPorEmail,
  atualizar,
  deletar
};
