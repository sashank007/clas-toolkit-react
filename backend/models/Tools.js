var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  rank: Number,
  name: String,
  url: String,
  icon: String,
  description: String,
});

var Tool = mongoose.model('Tools', Schema);

module.exports = Tool;
