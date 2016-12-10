var express = require('express');
var router = express.Router();

// MODELS
var User = require('../models/user.js');


//////// ROUTES

// NEW
router.get('/new', function(req, res) {
    // res.send('hello?');
    res.render('users/new.ejs');
});









// EXPORT
module.exports = router;
