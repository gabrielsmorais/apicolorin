var ObjectID = require('mongodb').ObjectID;

//Função que cria um item - ESTÁ FUNCIONANDO!!
exports.criarpost = function (req, res) {
  var data = req.body;
  var usuarioquery = req.params.usuario;

  //Puxar dados do usuario através do params username
  req.db.collection('usuario').findOne({"username": usuarioquery}, function(err, resultusuario) {
      if (err) {
          return res.sendStatus(503);
      };
        console.log (resultusuario);

    //Colocar dados do usuario no objeto data
    data.firstName = resultusuario.firstName;
    data.lastName = resultusuario.lastName;
    data.username = resultusuario.username;

    //Salvar dados que estão no body
    req.db.collection('post').save(data, function(err, result) {
      if (err) {
          return res.sendStatus(503);
      }
     return res.send(data);
   });
 });
};

//Função que realiza uma listagem geral de itens - ESTÁ FUNCIONANDO!!
exports.listar = function (req, res) {
  req.db.collection('post').find().toArray(function(err, result) {
      if (err) {
          return res.sendStatus(503);
      };

      res.send(result);
  });
};

//Função que realiza uma listagem filtrada de itens - ESTÁ FUNCIONANDO!!
exports.filtrar = function (req, res) {
  var busca = req.params.query;
  console.log(busca);

  req.db.collection('post').find({artName: busca}).toArray(function(err, result) {
      if (err) {
          return res.sendStatus(503);
      };

      res.send(result);
  });
};


//Função que realiza uma listagem filtrada de itens por usuário - ESTÁ FUNCIONANDO!!
exports.filtraremusuario = function (req, res) {
  var usuario = req.params.usuario

  req.db.collection('post').find({username: usuario}).toArray(function(err, result) {
      if (err) {
        return res.sendStatus(503);
};

res.send(result);
});
};

/*Função que edita um item do usuario que está logado [DUVIDA]
exports.editar = function (req, res) {
var usuario = {
username: [ ],
password: [ ],
};

req.db.collection('usuario').find(usuario, function(err, result) {

if (err || result == false) {
return res.sendStatus(401);
}
});
*/
