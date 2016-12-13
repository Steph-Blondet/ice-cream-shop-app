var express = require('express');
var router = express.Router();

// MODELS
var User = require('../models/user.js');
var IceCream = require('../models/icecream.js');


//////// ROUTES

// NEW ROUTE
// LOGIN: '/sessions/new'
router.get('/new', function(req, res) {
    res.render('sessions/new.ejs');
});


// CREATE ROUTE
// LOGIN: When clicking 'login' in the '/sessions/new'
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


// DELETE (LOGOUT) ROUTE
// LOGIN:
router.delete('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log('error', req.session);
        } else {
            res.redirect('/');
        }
    });
});


// EXPORT
module.exports = router;



// new
// router.get('/new', function(req, res) {
//     User.find({}, function(err, allUsers) {
//         res.render('sessions/new.ejs', {
//             users: allUsers
//         });
//     });
// });

//create working
// router.post('/', function(req, res) {
//     User.findOne({ username: req.body.username }, function(err, foundUser) {
//         if (req.body.password == foundUser.password) {
//             req.session.currentuser = foundUser;
//             res.render('users/show.ejs', {
//                 user: foundUser
//             });
//         } else {
//             res.send('wrong password');
//         }
//     });
// });

// router.post('/', function(req, res) {
//     User.findOne({ username: req.body.username }, function(err, foundUser) {
//         if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//             req.session.userLoggedIn = foundUser.username;
//             res.render('users/show.ejs', {
//                 user: foundUser
//             });
//         } else {
//             res.send('wrong password');
//         };
//     });
// });



// +router.delete('/', function(req, res) {
//  +    req.session.destroy(function(err) {
//  +        res.redirect('/');
//  +    });
//  +});


// // CREATE ROUTE
// // LOGIN: When clicking 'login' in the '/sessions/new'
// router.post('/', function(req, res) {
//     User.findOne({ username: req.body.username }, function(err, foundUser) {
//         if (foundUser.authenticate(req.body.password)) {
//             req.session.loggedInUser = { username: foundUser.username, id: foundUser.id }
//             req.session.currentuser = foundUser;
//             res.render('users/show.ejs', {
//                 user: foundUser
//             })
//         } else {
//             res.send('wrong password');
//         }
//     });
// });
