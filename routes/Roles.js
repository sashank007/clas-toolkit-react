var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    Authentication = require('../middleware/Authentication'),
    config = require('../middleware/config'),
    cas = Authentication.getInstance(config);
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

router.get('/', cas.bounce, (req, res) => {
  db.Roles.find({})
  .then((data) => {
      res.send(data);
  })
  .catch((err) => {
      res.send(err);
  });
});

router.post('/', cas.bounce, (req, res) => {
  db.Roles.create(req.body)
  .then(function(data){
      res.send(data);
  })
  .catch((err) => {
      res.send(err);
  });
});

router.put('/:id', cas.bounce, (req, res) => {
  fetch('https://asudir-solr.asu.edu/asudir/directory/select?q='.concat(req.body.asuriteId, '&wt=json'))
  .then((data) => data.json())
  .then((data) => {
    db.Roles.findOneAndUpdate(
      { name: req.params.id },
      { $push: { members: {
            id: data.response.docs[0].eid,
            name: data.response.docs[0].firstName.concat(" ", data.response.docs[0].lastName),
            department: data.response.docs[0].primaryDepartment,
            email: data.response.docs[0].emailAddress,
            asurite: data.response.docs[0].asuriteId,
            primaryTitle: data.response.docs[0].primaryTitle,
            photoUrl: data.response.docs[0].photoUrl,
            dateadded: new Date().toString(),
          }
        }
      },
      {},
      (err) => {
        if (err) return res.status(500).send({ error: err });
        return res.send({message: "Success"});
      }
    );
  })
  .catch((err) => res.status(500).send({ message: "Error" }));
});

router.delete("/:id", cas.bounce, (req, res) => {
  db.Roles.update(
    { name: req.params.id },
    { $pull: { members : { asurite: req.body.asuriteId } } },
    {},
    (err) => {
      if (err) return res.status(500).send({ error: err });
      return res.send({message: "Success"});
    }
  );
});

module.exports = router;
