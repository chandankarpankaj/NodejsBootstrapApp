var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  //sql call
  //api call
  //setting data
  res.render('page1',{
    title: 'Page1',
    header: 'This is page 1',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  })
});

router.get('/user', function(req, res){
  res.render('page1',{
    title: 'User',
    header: 'User',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  })
})

//URI param handling
router.get('/user/data/:userName', function(req, res){
  var userName = req.params.userName;
  res.render('page1',{
    title: 'UserInfo',
    header: 'User Information : ' + userName,
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  })
})

//Qquery param handling
router.get('/user/data', function(req, res){
  var userId = req.query.userId;
  var userName = req.query.userName;
  if(userId == undefined || userName == undefined){
    res.render('error',{
      title: 'ErrorPage',
      header: 'Error Information',
      author: req.app.get('author'),
      authorLink: req.app.get('authorLink'),
      errorMsg: 'Required query parameters userId and userName'
    })
    return;
  }
  res.render('page1', {
    title: 'UserData',
    header: 'User Data',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink'),
    userId: userId,
    userName: userName
  })
});

//redirect
router.get('/user/redirect', function(req, res){
  res.redirect('/page1/user/data/RedirectedUser');
})

module.exports = router;
