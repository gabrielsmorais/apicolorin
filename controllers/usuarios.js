var ObjectID = require('mongodb').ObjectID;

//Função que cria um novo usuário - ESTÁ FUNCIONANDO!!
exports.criarusuario = function (req, res) {

  var usuario = {
    username: req.body.username,
    password: req.body.password
  };

  req.db.collection('usuario').save(usuario, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    return res.sendStatus(201);
  });

}

//Função que confere usuário + senha - PRECISA DE AJUSTE
exports.validar = function (req, res) {
  var usuario = {
    username: req.body.username,
    password: req.body.password
  };

  req.db.collection('usuario').find(usuario, function(err, result) {

    if (err || result == false) {
      return res.sendStatus(401);
      }
      res.sendStatus(201);
    });
  };

//Função que recupera um usuário especifico - ESTÁ FUNCIONANDO!!
exports.listarespecifico = function(req, res) {
  var user = req.params.usuario;

  req.db.collection('usuario').find({username: user}).toArray(function(err, profile) {
    if (err) {
      return res.sendStatus(503);
    }

    return res.send(profile); // status implicito 200
  });
};

//Função que edita um usuário que está logado - PRECISA DE AJUSTE
exports.editar = function (req, res) {
  var user = req.params.usuario;

req.db.collection('usuario').update({username: user}, {$set: req.body}, function(err, result) {
  if (err) {
    return res.sendStatus(503);
  }

  res.send(result);
});
};
