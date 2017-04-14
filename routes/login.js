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
  req.flash('success_msg','Welcome '+username+'!');
  res.redirect('/news');
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    var dbUser = 'pankaj';
    var dbPass = 'admin@123';
    if(dbUser == username && dbPass == password){
      return done(null, username);
    } else {
      return done(null, false);
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
