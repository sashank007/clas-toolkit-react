var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  rank: Number,
  name: String,
  permissions: Array,
  members: Array,
});

var Roles = mongoose.model('Roles', Schema);

module.exports = Roles;
