// DEPENDENCIES
var express = require('express');
var router = express.Router();


// MODELS
var IceCream = require('../models/icecream.js');
var User = require('../models/user.js');


//////////////// ROUTES

// INDEX ROUTE = '/icecreams'
// ice creams's index page
router.get('/', function(req, res) {
    IceCream.find({}, function(err, foundIceCreams) {
        User.find({}, function(err, foundUsers) {
            res.render('icecreams/index.ejs', {
                icecreams: foundIceCreams,
                users: foundUsers,
                currentUser: req.session.currentuser
            });
        });
    });
}); //--> ok


// NEW ROUTE = '/icecreams/new'
// page where the user can add their new creation
router.get('/new', function(req, res) {
    User.find({}, function(err, allUsers) {
        res.render('icecreams/new.ejs', {
            users: allUsers,
            currentUser: req.session.currentuser
        });
    });
}); //--> ok


// CREATE ROUTE = triggered with the click of the button
// When clicking 'create ice cream' in the '/icecreams/new', it goes to the show page of that specific ice cream
router.post('/', function(req, res) {
    User.findById(req.body.userId, function(err, foundUser) {
        IceCream.create(req.body, function(err, createdIceCream) {
            foundUser.icecreams.push(createdIceCream);
            foundUser.save(function(err, data) {
                res.redirect('/icecreams');
            });
        });
	});
}); //--> ok


// UPDATE ROUTE = triggered with the click of the button
// when clicking the 'update ice cream' button in the '/icecreams/:id/edit'
router.put('/:id', function(req, res) {
    IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedIceCream) {
        User.findOne({'icecreams._id':req.params.id}, function(err, foundUser) {
            foundUser.icecreams.id(req.params.id).remove();
            foundUser.icecreams.push(updatedIceCream);
            foundUser.save(function(err, data) {
                res.redirect('/icecreams/' + req.params.id);
            });
        });
    });
}); //--> ok


// EDIT ROUTE = '/icecreams/:id/edit'
// when clicking the 'edit ice cream' link in the ice cream show page
 router.get('/:id/edit', function(req, res) {
    IceCream.findById(req.params.id, function(err, foundIceCream) {
        User.find({}, function(err, allUsers) {
            res.render('icecreams/edit.ejs', {
                icecream: foundIceCream,
                users: allUsers
            });
        });
    });
 }); //--> ok


// DELETE ROUTE = triggered with the click of the button
// when clicking the 'delete ice cream' button in the 'icecreams/:id' (ice cream show page)
 router.delete('/:id', function(req, res) {
     IceCream.findByIdAndRemove(req.params.id, function(err, foundIceCream) {
        User.findOne({'icecreams._id':req.params.id}, function(err, foundUser) {
            foundUser.icecreams.id(req.params.id).remove();
            foundUser.save(function(err, data){
                res.redirect('/icecreams');
            });
        });
     });
 }); //--> ok


 // SHOW ROUTE = '/icecreams/:id'
 // the show page of the ice cream that was clicked
 router.get('/:id', function(req, res) {
     IceCream.findById(req.params.id, function(err, foundIceCream){
         User.findOne({'icecreams._id':req.params.id}, function(err, foundUser){
             res.render('icecreams/show.ejs', {
                 user: foundUser,
                 icecream: foundIceCream,
                 currentUser: req.session.currentUser
             });
         });
     });
 }); //--> ok


//////////////// END OF ROUTES


// EXPORTING THE ROUTER
module.exports = router;
