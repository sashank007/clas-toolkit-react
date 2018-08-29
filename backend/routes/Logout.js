var express = require('express'),
    router = express.Router(),
    Authentication = require('../middleware/Authentication'),
    config = require('../middleware/config'),
    cas = Authentication.getInstance(config);

router.get( '/', cas.logout );

module.exports = router;
