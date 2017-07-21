var express = require('express');
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');

var usuarioController = require('./controllers/usuarios.js');
var postController = require('./controllers/posts.js');

// inicializa o express
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/colorin'));

 // inicializa o servidor na porta especificada
app.listen(3000, function() {
  console.log('Acesse o servidor http://104.131.166.166:3000');
});

// Endpoints usuario generico - no usuarios.js
app.post('/registerp1', usuarioController.criarusuario); // FUNCIONA NO BACK / FUNCIONA NO FRONT / LEANDRO
app.post('/login', usuarioController.validar); // FUNCIONA NO BACK / FUNCIONA N O FRONT / LEANDRO

// Endpoints usuario especifico - no usuarios.js
app.get('/profile/:usuario/list', usuarioController.listarespecifico); // NÃO FUNCIONA NO BACK / NÃO IMPLEMENTADO NO FRONT  / GEORGETE
app.put('/profile/:usuario/edit', usuarioController.editar); // NÃO FUNCIONA NO BACK  / NÃO ESTÁ SENDO USADO NO FRONT / NÃO PRIORITÁRIO

// Endpoints post generico
app.post('/:usuario/registerp2', postController.criarpost); // TESTAR / LEANDRO
app.get('/home', postController.listar); // FUNCIONA NO BACK / FUNCIONA NO FRONT - ARRUMAR DESTINAÇÃO DE FOTO
app.get('/search', postController.listar); // FUNCIONA NO BACK / FUNCIONA NO FRONT - ARRUMAR DESTINAÇÃO DE FOTO
app.get('/search/:query', postController.filtrar); // TESTAR / ??
app.get('/profile/:usuario', postController.filtraremusuario); // TESTAR / GEORGETE

// Endpoints post especifico
//app.put('/item/:id', postController.editar); [DÚVIDA]
