var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');


router.post('/register', function (req, res) {
  let account = new Account({
    username: req.body.username
    , ID: req.body.ID
    , city: req.body.city
    , street: req.body.street
    , firstName: req.body.firstName
    , lastName: req.body.lastName
  });

  Account.register(account, req.body.password, function (err, account) {

    passport.authenticate('local')(req, res, function () {
      if (req.session.passport) {
        Account.findOne({ username: req.session.passport.user })
          .then(account => {
            res.json(account);
          })
      }
    })
  })
});

// user login
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, account) {

    // check if account exists -  false means no account exists
    if (!account) {
      Account.find({ username: req.body.username }).then(user => {
        if (!user.length > 0)
          res.json({ hasError: 'Invalid Email Address.' });
        else
          res.json({ hasError: 'Invalid Password.' });
      });
    } else {
      // check if account exists -  account exists it may authenticate
      passport.authenticate('local')(req, res, function () {
        if (req.session.passport) {
          /// session is on
          Account.findOne({ username: req.session.passport.user })
            .then(fullUser => {
              res.json(fullUser);
            })
            .catch(err => {
              res.json({ hasError: `We are having issues, please try again later.` });
            });
        } else {
          //No Session
          res.json({ hasError: `Couldn't log in, please try again later.` });
        };
      });
    };
  })(req, res, next);
});

router.get('/checkSession', function (req, res, next) {

  if (req.session.passport) {
    Account.findOne({ username: req.session.passport.user })
      .then(fullUser => {
        res.json(fullUser);
      });
  } else {
    res.json({ hasError: "There's no active session" });
  }

});

router.get('/logout', function (req, res, next) {
  req.logout();
  req.session.passport = undefined;
  
  res.json({msg:"Logged out"});

});

module.exports = router;
