var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/simulator', function(req, res, next) {
  console.log(req.body.inner)
  res.render('simulator', { ancho: req.body.ancho,alto:req.body.alto, inner: req.body.inner });
});

// router.get('/prueba', function(req, res, next) {
//   console.log(req.query)
//   res.render('simulator', { ancho: req.query.ancho,alto:req.query .alto });
// });


module.exports = router;
