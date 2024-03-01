var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/simulator', function(req, res, next) {
  res.render('simulator', { ancho: req.body.ancho,alto:req.body.alto, inner: req.body.inner });
});


module.exports = router;
