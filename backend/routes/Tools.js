var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    CASAuthentication = require('cas-authentication');
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

// Create a new instance of CASAuthentication.
var cas = new CASAuthentication({
    cas_url     : 'https://weblogin.asu.edu/cas',
    service_url : 'https://tools.clas.asu.edu',
    cas_version     : '2.0',
    renew           : false,
    is_dev_mode     : true,
    dev_mode_user   : 'rbruce2',
    dev_mode_info   : {},
    session_name    : 'cas_user',
    session_info    : 'cas_userinfo',
    destroy_session : true
});

router.get('/', (req, res) => {
    db.Tools.find({})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.post('/', (req, res) => {
    db.Tools.create(req.body)
    .then(function(data){
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
});

module.exports = router;
