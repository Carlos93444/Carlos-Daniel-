const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

module.exports = {
  getAll(){
    return new Promise((resolve,reject)=>{
      db.all('SELECT * FROM clientes',[],(err,rows)=>{
        if(err) reject(err);
        resolve(rows);
      });
    });
  },
  getById(id){
    return new Promise((resolve,reject)=>{
      db.get('SELECT * FROM clientes WHERE id=?',[id],(err,row)=>{
        if(err) reject(err);
        resolve(row);
      });
    });
  },
  create(data){
    return new Promise((resolve,reject)=>{
      const {nome,email,telefone,data_nascimento}=data;
      db.run(
        'INSERT INTO clientes (nome,email,telefone,data_nascimento) VALUES (?,?,?,?)',
        [nome,email,telefone,data_nascimento],
        function(err){
          if(err) reject(err);
          resolve({id:this.lastID,...data});
        }
      );
    });
  },
  update(id,data){
    return new Promise((resolve,reject)=>{
      const {nome,email,telefone,data_nascimento}=data;
      db.run(
        'UPDATE clientes SET nome=?,email=?,telefone=?,data_nascimento=? WHERE id=?',
        [nome,email,telefone,data_nascimento,id],
        function(err){
          if(err) reject(err);
          resolve(this.changes>0);
        }
      );
    });
  },
  remove(id){
    return new Promise((resolve,reject)=>{
      db.run('DELETE FROM clientes WHERE id=?',[id],function(err){
        if(err) reject(err);
        resolve(this.changes>0);
      });
    });
  }
};
