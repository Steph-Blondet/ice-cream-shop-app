var mongoose = require('mongoose');
var IceCream = require('./icecream.js');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    icecreams: [IceCream.schema]
});


// // PASSWORD AUTHENTICATION
// userSchema.pre('save', function(next) {
//   if (!this.isModified('password')) { return next(); }
//   var hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
//   this.password = hashedPassword;
//   next();
// });
//
// // userSchema.methods.authenticate = function(password) {
// //   return bcrypt.compareSync(password, this.password);
// // } //--> needs more work
// // //-------------------------------------------------------------


var User = mongoose.model('User', userSchema);

// EXPORTING THE MODEL
module.exports = User;
