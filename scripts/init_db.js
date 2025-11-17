const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    data_nascimento TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );`);
});

console.log("Banco criado!");
db.close();
