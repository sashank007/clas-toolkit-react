var express = require('express'),
    router = express.Router(),
    Authentication = require('../middleware/Authentication'),
    config = require('../middleware/config'),
    cas = Authentication.getInstance(config);
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

router.get('/dashboard', cas.bounce, (req, res) => {
  fetch('https://asudir-solr.asu.edu/asudir/directory/select?q='.concat(req.session.cas_user, '&wt=json'))
  .then((data) => data.json())
  .then((currentUser) => res.send(currentUser.response))
  .catch((err) => res.status(500).send({ message: "Error" }));
});

module.exports = router;
