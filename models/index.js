var mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.Tools = require('./Tools');
module.exports.Roles = require('./Roles');
