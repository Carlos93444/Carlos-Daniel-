const express = require('express');
const app = express();
const db = require('./database');
app.use(express.json());

app.get('/clientes', async (req,res)=>{
  const clientes = await db.getAll();
  res.json(clientes);
});

app.get('/clientes/:id', async (req,res)=>{
  const cliente = await db.getById(req.params.id);
  if(!cliente) return res.status(404).json({error:'Cliente não encontrado'});
  res.json(cliente);
});

app.post('/clientes', async (req,res)=>{
  const novo = await db.create(req.body);
  res.status(201).json(novo);
});

app.put('/clientes/:id', async (req,res)=>{
  const ok = await db.update(req.params.id, req.body);
  if(!ok) return res.status(404).json({error:'Cliente não encontrado'});
  res.json({message:'Cliente atualizado'});
});

app.delete('/clientes/:id', async (req,res)=>{
  const ok = await db.remove(req.params.id);
  if(!ok) return res.status(404).json({error:'Cliente não encontrado'});
  res.status(204).send();
});

module.exports = app;

if(require.main === module){
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log('API rodando na porta ' + port));
}
