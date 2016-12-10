// DEPENDENCIES
var express = require('express');
var mongoose = require('mongoose');
var app = express();



// DATABASE
mongoose.connect('mongodb://localhost:27017/icecream');

mongoose.connection.once('open', function() {
    console.log('connected to mongo');
});


// CONTROLLERS



// MIDDLEWARE



// ROOT ROUTE
app.get('/', function(req, res){
    res.send('hello!');
    res.render('index.ejs');
});


// LISTENER
app.listen(3000, function() {
    console.log("I'm listening :) ");
});
