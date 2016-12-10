var express = require('express');
var router = express.Router();

// MODELS
var User = require('../models/user.js');


//////// ROUTES
// INDEX
router.get('/', function(req, res){
    User.find({}, function(err, foundUsers){
        res.render('users/index.ejs', {
            usersAll: foundUsers
        });
    });
});


// NEW
router.get('/new', function(req, res) {
    // res.send('hello?');
    res.render('users/new.ejs');
});


// CREATE
router.post('/', function(req, res){
    User.create(req.body, function(err, createdUser){
        res.redirect('/users');
    });
});


// SHOW
router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        res.render('users/show.ejs', {
            user: foundUser
        });
    });
});








// EXPORT
module.exports = router;
