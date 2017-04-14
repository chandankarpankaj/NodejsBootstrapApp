var express = require('express');
var router = express.Router();
var winston = require('winston');

router.get('/', getLoginPage);
router.post('/', doUserLogin);

function getLoginPage(req, res){
  res.render('login',{
    title: 'TopNews',
    header: 'Global Top News',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  });
};

function doUserLogin(req, res){
  var username = req.body.username;
  var password = req.body.password;
  winston.info('Validating user: ' + username);
  res.render('login',{
    title: 'TopNews',
    header: 'Global Top News',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink'),
    username: username
  });
};

module.exports = router;
