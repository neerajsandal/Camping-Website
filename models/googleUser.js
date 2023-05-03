const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
  googleId: String,
  token: String,
  email: String,
  firstName: String,
  lastName: String,
  picture: String
});

module.exports = mongoose.model('GoogleUser', GoogleUserSchema);