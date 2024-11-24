const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
},{timestamps:true});


const Register = mongoose.model('Register', registerSchema);

module.exports = Register;