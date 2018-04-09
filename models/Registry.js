var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registrySchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date
});

//regexp schemas

module.exports = mongoose.model('Registry', registrySchema);

