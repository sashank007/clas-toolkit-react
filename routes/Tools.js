var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    Authentication = require('../middleware/Authentication'),
    config = require('../middleware/config'),
    cas = Authentication.getInstance(config);
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

router.get('/', cas.bounce, (req, res) => {
  db.Tools.find({})
  .then((data) => {
      res.send(data);
  })
  .catch((err) => {
      res.send(err);
  });
});

router.post('/', cas.bounce, (req, res) => {
  db.Tools.create(req.body)
  .then(function(data){
      res.send(data);
  })
  .catch((err) => {
      res.send(err);
  });
});

module.exports = router;
