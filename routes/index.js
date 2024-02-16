var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/simulator', function(req, res, next) {
  res.render('simulator', { ancho: 20,alto:20 });
});


module.exports = router;
