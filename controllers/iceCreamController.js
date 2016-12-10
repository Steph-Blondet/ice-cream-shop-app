var express = require('express');
var router = express.Router();

// MODELS
var IceCream = require('../models/icecream.js');
var User = require('../models/user.js');


//////// ROUTES

// INDEX
router.get('/', function(req, res) {
    IceCream.find({}, function(err, foundIceCreams) {
        if(err) { console.log(err) }
        res.render('icecreams/index.ejs', {
            allIceCreams: foundIceCreams
         });
     });
});


// NEW
router.get('/new', function(req, res) {
    res.render('icecreams/new.ejs');
});


// CREATE
router.post('/', function(req, res) {
	IceCream.create(req.body, function(err, createdIceCream) {
		res.redirect('/icecreams');
	});
});


// SHOW
router.get('/:id', function(req, res) {
    IceCream.findById(req.params.id, function(err, foundIceCream){
        res.render('icecreams/show.ejs', {
            icecream: foundIceCream
        });
    });
});


// UPDATE
router.put('/:id', function(req, res) {
    IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedIceCream) {
        // console.log(updatedUser);
        res.render('icecreams/show.ejs', {
            icecream: updatedIceCream
        });
    });
});


// EDIT
 router.get('/:id/edit', function(req, res) {
    IceCream.findById(req.params.id, function(err, foundIceCream) {
        res.render('icecreams/edit.ejs', {
            icecream: foundIceCream
        });
    });
 });


// DELETE
 router.delete('/:id', function(req, res){
     IceCream.findByIdAndRemove(req.params.id, function() {
         res.redirect('/icecreams');
     });
 });



// EXPORT
module.exports = router;
