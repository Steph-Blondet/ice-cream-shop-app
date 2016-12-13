var express = require('express');
var router = express.Router();

// MODELS
var User = require('../models/user.js');
var IceCream = require('../models/icecream.js');



//////// ROUTES
// INDEX ROUTE
router.get('/', function(req, res) {
    User.find({}, function(err, foundUsers) {
        res.render('users/index.ejs', {
            usersAll: foundUsers
        });
    });
});


// NEW ROUTE
// REGISTER(SIGN UP): '/users/new'
router.get('/new', function(req, res) {
    res.render('users/new.ejs');
});


// CREATE ROUTE
// REGISTER(SIGN UP): When clicking 'create user' in the '/users/new'
router.post('/', function(req, res) {
    User.create(req.body, function(err, newUser) {
        res.render('users/show.ejs', {
            user: newUser
        });
    });
});


// SHOW ROUTE
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('users/show.ejs', {
            user: foundUser
        });
    });
});


// EDIT ROUTE
router.get('/:id/edit', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        // console.log(foundUser);
        res.render('users/edit.ejs', {
            user: foundUser
        });
    });
});


// UPDATE ROUTE
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedUser) {
        // console.log(updatedUser);
        res.render('users/show.ejs', {
            user: updatedUser
        });
    });
});


// DELETE ROUTE
// deleting registered(created) user from the 'delete user' button in the 'users/show'
router.delete('/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function() {
        res.redirect('/users');
    });
});


// EXPORT
module.exports = router;


// router.delete('/:id', function(req, res){
//     User.findByIdAndRemove(req.params.id, function(err, foundUser) {
//         IceCream.findOne({'username._id':req.params.id}, function(err, foundIceCream){
//             foundIceCream.user.id(req.params.id).remove();
//             foundIceCream.save(function(err, data){
//                 res.render('index.ejs', {
//                     user: userRemoved
//             });
//         });
//     });
// });
// });
