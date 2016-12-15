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
            usersAll: foundUsers,
            currentUser: req.session.currentuser
        });
    });
});  //--> ok


// NEW ROUTE = '/users/new'
// page where the user can add their new profile info (username and password)
router.get('/new', function(req, res) {
    res.render('users/new.ejs');
}); //--> ok


// CREATE ROUTE = triggered with the click of the button
// When clicking 'create user' in the '/users/new', it goes to the login page '/sessions/new' so the user can login
router.post('/', function(req, res) {
    User.create(req.body, function(err, users) {
        res.redirect('/sessions/new');
    });
}); //--> ok


// EDIT ROUTE = '/users/:id/edit'
// when clicking the 'edit user' link in the user show page
router.get('/:id/edit', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        // console.log(foundUser);
        res.render('users/edit.ejs', {
            user: foundUser,
            currentUser: req.session.currentuser
        });
    });
}); //--> ok


// UPDATE ROUTE = triggered with the click of the button
// when clicking the 'update user' button in the '/users/:id/edit'
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedUser) {
        // console.log(updatedUser);
        res.redirect('/users/' + req.params.id);
    });
}); //--> ok


// DELETE ROUTE = triggered with the click of the button
router.delete('/:userId', function(req, res){
    User.findByIdAndRemove(req.params.userId, function(err, foundUser) {
        IceCream.collection.remove({ 'userId':req.params.userId} , function(err, foundIceCreams) {
            req.session.destroy();
            res.redirect('/');
        });
    });
}); //--> ok


// SHOW ROUTE = '/users/:id'
// the show page of the user that was clicked
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('users/show.ejs', {
            user: foundUser,
            currentUser: req.session.currentuser
        });
    });
}); //--> ok

//////////////// END OF ROUTES


// EXPORTING THE ROUTER
module.exports = router;
