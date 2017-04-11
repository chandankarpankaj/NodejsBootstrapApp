var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.render('form', {
    title: 'UserCreate',
    header: 'Please fill below information'
  })
})

router.post('/createUser', function(req, res){
  console.log('In post method');
  res.render('form',{
    title: 'UserCreate',
    header: 'Please fill below information',
    userId: req.body.userId,
    userName: req.body.userName,
    returnMsg: 'User is created'
  })
})

module.exports = router;
