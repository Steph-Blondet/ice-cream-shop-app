// DEPENDENCIES
var express = require('express');
var router = express.Router();


// MODELS
var User = require('../models/user.js');
var IceCream = require('../models/icecream.js');


//////////////// ROUTES

// INDEX ROUTE = '/users'
// user's index page. this is the page that only has the link to login or register
router.get('/', function(req, res) {
    User.find({}, function(err, foundUsers) {
        res.render('users/index.ejs', {
            usersAll: foundUsers
        });
    });
});


// NEW ROUTE = '/users/new'
// page where the user can add their new profile info (username and password)
router.get('/new', function(req, res) {
    res.render('users/new.ejs');
});


// CREATE ROUTE = triggered with the click of the button
// When clicking 'create user' in the '/users/new', it goes to the show page of that specific user
router.post('/', function(req, res) {
    User.create(req.body, function(err, newUser) {
        res.render('users/show.ejs', {
            user: newUser
        });
    });
});


// EDIT ROUTE = '/users/:id/edit'
// when clicking the 'edit user' link in the user show page
router.get('/:id/edit', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        // console.log(foundUser);
        res.render('users/edit.ejs', {
            user: foundUser
        });
    });
});


// UPDATE ROUTE = triggered with the click of the button
// when clicking the 'update user' button in the '/users/:id/edit'
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedUser) {
        // console.log(updatedUser);
        res.redirect('/users/' + req.params.id);
    });
});


// DELETE ROUTE = triggered with the click of the button
// when clicking the 'delete user' button in the 'users/:id' (user's show page)
router.delete('/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function() {
        res.redirect('/users');
    });
});


// SHOW ROUTE = '/users/:id'
// the show page of the user that was clicked
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('users/show.ejs', {
            user: foundUser
        });
    });
});

//////////////// END OF ROUTES


// EXPORTING THE ROUTER
module.exports = router;
