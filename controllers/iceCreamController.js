var express = require('express');
var router = express.Router();

// MODELS
var IceCream = require('../models/icecreams.js');


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


// SHOW
router.get('/icecreams/:id', function(req, res){
    IceCream.findById(req.params.id, function(err, foundIceCream){
        res.render('icecreams/show.ejs', {
            icecream: foundIceCream
        });
    });
});




// EXPORT
module.exports = router;
