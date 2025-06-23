# 🚀 API RESTful de Usuários e Tarefas com JWT e PostgreSQL

Este projeto é uma API desenvolvida em **Node.js** com **Express.js**, que permite o cadastro de usuários, autenticação via JWT e gerenciamento de tarefas. Os dados agora são armazenados em um **banco de dados PostgreSQL**.

---

## 📚 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ CRUD de tarefas (Create, Read, Update, Delete)
- ✅ Proteção de rotas com middleware JWT
- ✅ Integração com banco de dados PostgreSQL
- ✅ Documentação com Swagger UI

---

## 🧪 Tecnologias utilizadas

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- bcryptjs (criptografia de senha)
- jsonwebtoken (JWT)
- uuid (gerador de ID único)
- swagger-ui-express
- dotenv (variáveis de ambiente)

---

## 📦 Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/GabrielSbruzzi/Projeto-API.git
````

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
node server.js
```

Por padrão, o servidor será iniciado em `http://localhost:3000`.

---

## 🔐 Autenticação

Após o login, você receberá um token JWT. Use-o no cabeçalho das requisições protegidas:

```
Authorization: Bearer <seu-token>
```

---

## 📘 Documentação com Swagger

A documentação da API está disponível em:

```
http://localhost:3000/api-docs
```

---

## 📂 Estrutura do Projeto

```
.
├── controllers/       # Lógica de entrada (HTTP)
├── service/           # Regras de negócio
├── repository/        # Simula banco de dados (em memória)
├── middleware/        # Autenticação JWT
├── routes/            # Arquivos de rotas
├── tests/             # Testes
├── swagger.json       # Configuração da documentação
├── server.js          # Inicialização da aplicação
├── app.js             # Rotas públicas e Protegidas
└── README.md
```

---

## ✉️ Endpoints principais

### 🔐 Autenticação

* `POST /auth/login` → Gera e retorna o token JWT

### 👤 Usuários

* `POST /users` → Cria novo usuário
* `GET /users` → Lista todos os usuários

### ✅ Tarefas (requer token JWT)

* `POST /tasks` → Cria nova tarefa
* `GET /tasks` → Lista todas as tarefas
* `GET /tasks/:id` → Busca uma tarefa específica
* `PUT /tasks/:id` → Atualiza uma tarefa
* `DELETE /tasks/:id` → Remove uma tarefa

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
