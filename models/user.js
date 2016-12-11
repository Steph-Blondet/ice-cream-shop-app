var mongoose = require('mongoose');
var IceCream = require('./icecream.js');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    icecreams: [IceCream.schema]
});


var User = mongoose.model('User', userSchema);

module.exports = User;
