var express = require('express');
var router = express.Router();
var winston = require('winston');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', getLoginPage);
router.post('/', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), myHomePage);

function getLoginPage(req, res){
  res.render('login',{
    title: 'TopNews',
    header: 'Global Top News',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  });
};

function myHomePage(req, res){
  var username = req.body.username;
  var password = req.body.password;
  winston.info('Validated user: ' + username);
  winston.info('Validated password: ' + password);
  res.redirect('/news');
};

passport.use(new LocalStrategy({
    passReqToCallback: true // don't forget this
  },
  function(req, username, password, done) {
    var dbUser = 'pankaj';
    var dbPass = 'admin@123';
    if(dbUser == username && dbPass == password){
      return done(null, username, req.flash('success_msg','Welcome '+username+'!'));
    } else {
      return done(null, false, req.flash('error_msg','Invalid username or password.'));
    }
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

module.exports = router;
