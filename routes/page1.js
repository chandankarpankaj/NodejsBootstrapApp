var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  //sql call
  //api call
  //setting data
  res.render('page1',{
    title: 'Page1'
  })
});

router.get('/user', function(req, res){
  res.render('page1',{
    title: 'UserInfo',
    header: 'User Information1'
  })
})

//URI param handling
router.get('/user/data/:userName', function(req, res){
  var userName = req.params.userName;
  res.render('page1',{
    title: 'UserInfo',
    header: 'User Information2 : ' + userName,
    author: req.app.get('author')
  })
})

//Qquery param handling
router.get('/user/data', function(req, res){
  var userId = req.query.userId;
  var userName = req.query.userName;
  if(userId == undefined || userName == undefined){
    res.render('error',{
      title: 'ErrorPage',
      header: 'Error Information3',
      errorMsg: 'Required query parameters userId and userName'
    })
    return;
  }
  res.render('page1', {
    title: 'UserInfo',
    header: 'User Information4',
    userId: userId,
    userName: userName
  })
});

//redirect
router.get('/user/redirect', function(req, res){
  res.redirect('/page1/user/data/RedirectedUser');
})

module.exports = router;
