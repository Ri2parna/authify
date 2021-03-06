const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: [6, 'Minimum length of username should be 6 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fName: String,
  lName: String,
});
// runs this hook before storing the database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next(); // without this function, the middleware stucks in a loop
});

// create static method to login user
userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password'); //TODO: #1 Need to implement error handling this errors
  }
  throw Error('Incorrect Email');
};
userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
const User = mongoose.model('user', userSchema);
module.exports = User;
