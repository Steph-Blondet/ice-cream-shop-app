var mongoose = require('mongoose');
var User = require('./user.js');

var iceCreamSchema = mongoose.Schema({
    nameOfCreation: String,
    flavor: String,
    toppings: String,
    sauces: String
});

var IceCream = mongoose.model('IceCream', iceCreamSchema);

// EXPORTING THE MODEL
module.exports = IceCream;
