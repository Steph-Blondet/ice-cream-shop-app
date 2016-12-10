var express = require('express');
var router = express.Router();

// MODELS
var User = require('../models/user.js');
var IceCream = require('../models/icecream.js');


//////// ROUTES
// INDEX
router.get('/', function(req, res) {
    User.find({}, function(err, foundUsers) {
        res.render('users/index.ejs', {
            usersAll: foundUsers
        });
    });
});


// NEW
router.get('/new', function(req, res) {
    res.render('users/new.ejs');
});


// CREATE
router.post('/', function(req, res) {
    User.create(req.body, function(err, createdUser) {
        res.redirect('/users');
    });
});


// SHOW
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('users/show.ejs', {
            user: foundUser
        });
    });
});


// UPDATE
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedUser) {
        // console.log(updatedUser);
        res.render('users/show.ejs', {
            user: updatedUser
        });
    });
});


// EDIT
router.get('/:id/edit', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        // console.log(foundUser);
        res.render('users/edit.ejs', {
            user: foundUser
        });
    });
});


// DELETE
router.delete('/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function() {
        res.redirect('/users');
    });
});


// EXPORT
module.exports = router;
