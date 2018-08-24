var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  url: String,
  imgurl: String
});

var Tool = mongoose.model('Tools', Schema);

module.exports = Tool;
