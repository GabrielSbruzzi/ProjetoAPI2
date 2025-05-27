# 📌 API de Usuários e Tarefas (CRUD com JWT)

Este projeto contém as rotas para gerenciar **usuários** e **tarefas** utilizando autenticação JWT.

---

## 👤 Usuários

### 1. Crie um usuário

**Método:** POST
**URL:** `http://localhost:3000/users`
**Body (JSON):**

```json
{
  "nome": "Gabriel",
  "email": "gabriel@email.com",
  "senha": "123456"
}
```

---

### 2. Liste todos os usuários

**Método:** GET
**URL:** `http://localhost:3000/users`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI

---

### 3. Liste um usuário por ID

**Método:** GET
**URL:** `http://localhost:3000/users/ID_DO_USUARIO`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI

---

### 4. Atualize um usuário

**Método:** PUT
**URL:** `http://localhost:3000/users/ID_DO_USUARIO`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI
**Body (JSON):**

```json
{
  "nome": "Gabriel Atualizado",
  "email": "novo@email.com",
  "senha": "novaSenha123"
}
```

---

### 5. Delete um usuário

**Método:** DELETE
**URL:** `http://localhost:3000/users/ID_DO_USUARIO`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI

---

## ✅ Login (Autenticação JWT)

### Faça login

**Método:** POST
**URL:** `http://localhost:3000/auth/login`
**Body (JSON):**

```json
{
  "email": "gabriel@email.com",
  "senha": "123456"
}
```

**Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 📝 Tarefas

### 1. Crie uma tarefa

**Método:** POST
**URL:** `http://localhost:3000/tasks`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI
**Body (JSON):**

```json
{
  "nome": "Estudar Node.js",
  "descricao": "Praticar com autenticação JWT",
  "usuarioId": "ID_DO_USUARIO"
}
```

---

### 2. Liste todas as tarefas de um usuário

**Método:** GET
**URL:** `http://localhost:3000/tasks?usuarioId=ID_DO_USUARIO`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI

---

### 3. Liste uma tarefa por ID

**Método:** GET
**URL:** `http://localhost:3000/tasks/ID_DA_TAREFA`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI

---

### 4. Atualize uma tarefa

**Método:** PUT
**URL:** `http://localhost:3000/tasks/ID_DA_TAREFA`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI
**Body (JSON):**

```json
{
  "nome": "Estudar Node.js - Atualizado",
  "descricao": "Aprimorar rotas protegidas com JWT"
}
```

---

### 5. Delete uma tarefa

**Método:** DELETE
**URL:** `http://localhost:3000/tasks/ID_DA_TAREFA`
**Headers:**
Authorization: Bearer SEU\_TOKEN\_AQUI
