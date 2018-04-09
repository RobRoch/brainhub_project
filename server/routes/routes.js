var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Registry = require('../../models/Registry');

router.get('/', function (req, res) {
  res.render('index');
});

router.route('/insert')
  .post(function (req, res) {
    var registry = new Registry();
    registry.firstName = req.body.fName;
    registry.lastName = req.body.lName;
    registry.email = req.body.email;
    registry.date = req.body.date;
    registry.save(function (err) {
      if (err)
        res.send(err);
      res.send('Registration successfully added!');
    });
  });

module.exports = router;