var mongoose = require('mongoose');

var iceCreamSchema = mongoose.Schema({
    nameOfCreation: String,
    flavor: String,
    toppings: String,
    sauces: String
});

var IceCream = mongoose.model('IceCream', iceCreamSchema);

module.exports = IceCream;
