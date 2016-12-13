// DEPENDENCIES
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var app = express();


// PORT
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/icecream';


// CONTROLLERS
var userController = require('./controllers/userController.js');
var iceCreamController = require('./controllers/iceCreamController.js')
var sessionsController = require('./controllers/sessionsController.js');


// MIDDLEWARE
app.use(session ({
    secret: "this is secret",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userController);
app.use('/icecreams', iceCreamController);
app.use('/sessions', sessionsController);


// CUSTOM MIDDLEWARE
// function userLoggedIn(req, res, next) {
//     if (req.session.loggedInUser) {
//         return next();
//     } else {
//         req.session.badAttempt = true;
//         res.render('icecreams/new.ejs');
//     } // userLoggedIn,
// }


// ROOT ROUTE
app.get('/', function(req, res){
    res.render('index.ejs');
});


// DATABASE
mongoose.connect(mongoDBURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connected to mongo');
});


// LISTENER
app.listen(port, function() {
    console.log("I'm listening on port: " + port);
});
