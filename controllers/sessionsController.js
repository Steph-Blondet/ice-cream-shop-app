var express = require('express');
var router = express.Router();


// MODELS
var User = require('../models/user.js');


//////// ROUTES

// NEW ROUTE
// LOGIN: '/sessions/new'
router.get('/new', function(req, res) {
    res.render('sessions/new.ejs');
}); //--> ok


// POST ROUTE
// LOGIN: When clicking 'login' in the '/sessions/new'
router.post('/', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, foundUser) {
        if (req.body.password == foundUser.password) {
            req.session.currentuser = foundUser;
                res.redirect('/icecreams');
        } else {
            res.send('wrong password');
        }
    });
}); //--> ok


// DELETE (LOGOUT) ROUTE
// LOGIN:
router.delete('/', function(req, res) {
    req.session.destroy();
    res.redirect('/');
}); //--> ok


// EXPORT
module.exports = router;
