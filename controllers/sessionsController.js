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
router.post('/', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, foundUser) {
        if (req.body.password == foundUser.password) {
            req.session.currentuser = foundUser;
            res.render('users/show.ejs', {
                user: foundUser
            });
        } else {
            res.send('wrong password');
        }
    });
});


// DELETE (LOGOUT)
router.delete('/', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


// EXPORT
module.exports = router;
