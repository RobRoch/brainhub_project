var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Registry = require('../../models/Registry');

router.get('/', function(req, res){
  res.render('index');
});

router.route('/insert').post(function(req,res) {
  var registry = new Registry();
  registry.description = req.body.desc;
  registry.amount = req.body.amount;
  registry.month = req.body.month;
  registry.year = req.body.year;
  
  registry.save(function(err) {
      if (err)
        res.send(err);
      res.send('Registry successfully added!');
  });
});


router.get('/getAll',function(req, res) {
  var monthRec = req.query.month;
  var yearRec = req.query.year;
  if(monthRec && monthRec != 'All'){
    Registry.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, registries) {
      if (err)
      res.send(err);
      res.json(registries);
    });
  } else {
    Registry.find({year: yearRec}, function(err, registries) {
      if (err)
      res.send(err);
      res.json(registries);
    });
  }
});


module.exports = router;