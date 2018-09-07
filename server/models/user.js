var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
  emailInput: String,
  passInput: String
});

module.exports = mongoose.model('user', userSchema);
