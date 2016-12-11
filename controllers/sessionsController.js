var express = require('express');
var router = express.Router();

// MODELS
var User = require('../models/user.js');


//////// ROUTES

// NEW
router.get('/new', function(req, res) {
    res.render('sessions/new.ejs');
});


// CREATE




// DELETE (LOGOUT)



// EXPORT
module.exports = router;
