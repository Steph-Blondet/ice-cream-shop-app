var express = require('express');
var router = express.Router();

// MODELS
var IceCream = require('../models/icecream.js');



//////// ROUTES

// INDEX
router.get('/', function(req, res){
    IceCream.find({}, function(err, foundIceCreams){
        if(err) { console.log(err) }
        // res.send('list of flavors');
        res.render('icecreams/index.ejs', {
            allIceCreams: foundIceCreams
         });
     });
});


// NEW
router.get('/:id/new', function(req, res) {
    res.render('icecreams/new.ejs');
});


// CREATE
router.post('/', function(req, res){
    IceCream.create(req.body, function(err, createdIceCream){
        res.render('users/show.ejs', {
            creation: createdIceCream
        });
    });
});

// // SHOW
// router.get('/icecreams/:id', function(req, res){
//     IceCream.findById(req.params.id, function(err, foundIceCream){
//         res.render('icecreams/show.ejs', {
//             icecream: foundIceCream
//         });
//     });
// });




// EXPORT
module.exports = router;
