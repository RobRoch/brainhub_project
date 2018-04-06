var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registrySchema = new Schema({
  description: String,
  amount: Number,
  month: String,
  year: Number
});

module.exports = mongoose.model('Registry', registrySchema);

