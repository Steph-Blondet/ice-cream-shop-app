// DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app = express();

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONTROLLERS
var iceCreamController = require('./controllers/iceCreamController.js')
app.use('/icecreams', iceCreamController);

var userController = require('./controllers/userController.js');
app.use('/users', userController);


// DATABASE
mongoose.connect('mongodb://localhost:27017/icecream');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connected to mongo');
});



// ROOT ROUTE
app.get('/', function(req, res){
    // res.send('hello!');
    res.render('./index.ejs');
});


// LISTENER
app.listen(3000, function() {
    console.log("I'm listening :) ");
});
