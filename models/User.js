const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length is 6 characters"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // console.log(`Previous Hook: \n ${this}`);
  next();
});

//create static method to login user
userSchema.statics.login = async function({email, password}){
  const user = await this.findOne({email: email});
 if(user) {
   const auth = await bcrypt.compare(password, user.password);
   if(auth){
     return user;
   }
   throw Error("Incorrect Password");
 }
 throw Error("Incorrect Email");
}
userSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });
const User = mongoose.model("user", userSchema);
module.exports = User;
