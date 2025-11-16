PIT – Projeto Integrador Transdisciplinar em Engenharia de Software II
📁 Estrutura do projeto
pit-sistema-clientes/
│
├── package.json
├── server.js
├── database.js
├── README.md
│
├── scripts/
│   └── init_db.js
│
└── db/
    └── database.sqlite   (será criado automaticamente)
    
    📌 1) Arquivo package.json
    Crie um arquivo chamado package.json com este conteúdo:
    {
  "name": "pit-sistema-clientes",
  "version": "1.0.0",
  "description": "Projeto PIT - Sistema de Cadastro de Clientes (Node + Express + SQLite)",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "init-db": "node scripts/init_db.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6",
    "cors": "^2.8.5"
  }
}
npm install

📌 2) Arquivo database.js
Crie o arquivo:
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'db', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("Banco conectado em:", dbPath);
  }
});

module.exports = db;

📌 3) Script scripts/init_db.js

Crie a pasta scripts/ e dentro coloque:

const db = require('../database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT,
      data_nascimento TEXT,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Tabela 'clientes' criada ou já existente.");
});

db.close();
npm run init-db

📌 4) Arquivo principal server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// ROTA TESTE
app.get("/", (req, res) => {
  res.json({ message: "API PIT - Sistema de Clientes funcionando!" });
});

// LISTAR CLIENTES
app.get("/clientes", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// BUSCAR POR ID
app.get("/clientes/:id", (req, res) => {
  db.get("SELECT * FROM clientes WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(row);
  });
});

// CRIAR CLIENTE
app.post("/clientes", (req, res) => {
  const { nome, email, telefone, data_nascimento } = req.body;

  db.run(
    `INSERT INTO clientes (nome, email, telefone, data_nascimento) VALUES (?, ?, ?, ?)`,
    [nome, email, telefone, data_nascimento],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      res.status(201).json({
        id: this.lastID,
        nome,
        email,
        telefone,
        data_nascimento
      });
    }
  );
});

// ATUALIZAR CLIENTE
app.put("/clientes/:id", (req, res) => {
  const { nome, email, telefone, data_nascimento } = req.body;

  db.run(
    `UPDATE clientes SET nome=?, email=?, telefone=?, data_nascimento=? WHERE id=?`,
    [nome, email, telefone, data_nascimento, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Cliente atualizado" });
    }
  );
});

// EXCLUIR CLIENTE
app.delete("/clientes/:id", (req, res) => {
  db.run(`DELETE FROM clientes WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

// INICIAR SERVIDOR
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

📌 5) README.md para colocar no GitHub

Crie o arquivo README.md com esse conteúdo:
# Sistema de Cadastro de Clientes  
Projeto do PIT – Engenharia de Software – Cruzeiro do Sul Virtual

Este projeto é uma API REST simples para cadastro de clientes utilizando:

- Node.js  
- Express  
- SQLite  
- CRUD completo  
- Deploy em Railway (ou outro que você escolher)

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

git clone https://github.com/SEU-USUARIO/pit-sistema-clientes.git
cd pit-sistema-clientes

### 2. Instalar dependências

### 3. Criar banco de dados SQLite

### 4. Executar servidor

Servidor disponível em:

---

## 📌 Endpoints

### GET /clientes  
Lista todos os clientes.

### GET /clientes/:id  
Busca um cliente pelo ID.

### POST /clientes  
Cria um novo cliente. Exemplo:
```json
{
  "nome": "João",
  "email": "joao@email.com",
  "telefone": "99999-0000",
  "data_nascimento": "2000-01-01"
}

PUT /clientes/:id

Atualiza um cliente.

DELETE /clientes/:id

Remove um cliente pelo ID.


📁 Estrutura

server.js
database.js
scripts/init_db.js
db/database.sqlite

