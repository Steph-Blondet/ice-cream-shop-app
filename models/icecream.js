var mongoose = require('mongoose');
// var User = require('./user.js');

var iceCreamSchema = mongoose.Schema({
    nameOfCreation: String,
    flavor: String,
    toppings: String,
    sauces: String
    // user: [User.schema]
});

var IceCream = mongoose.model('IceCream', iceCreamSchema);

module.exports = IceCream;
