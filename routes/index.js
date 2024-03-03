var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/simulator', function(req, res, next) {
  let ancho = parseInt(req.body.ancho)
  let alto = parseInt(req.body.alto)
  let maximo = ((ancho > alto) ? ancho : alto)
  res.render('simulator', { ancho: ancho, alto:alto, maximo: maximo, inner: parseInt(req.body.inner) });
});


module.exports = router;
