var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.render('form', {
    title: 'UserCreate',
    header: 'Please fill below information',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  })
})

router.post('/createUser', function(req, res){
  console.log('In post method');
  res.render('form',{
    title: 'UserCreated',
    header: 'User information',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink'),
    userId: req.body.userId,
    userName: req.body.userName,
    returnMsg: 'User is created'
  })
})

module.exports = router;
