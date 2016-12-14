var mongoose = require('mongoose');

var iceCreamSchema = mongoose.Schema({
    userId: String,
    nameOfCreation: String,
    flavor: String,
    toppings: String,
    sauces: String
});

var IceCream = mongoose.model('IceCream', iceCreamSchema);

    
// EXPORTING THE MODEL
module.exports = IceCream;
