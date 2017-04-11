var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  //sql call
  //api call
  //setting data
  res.render('page2',{
    title: 'Page2'
  })
});

module.exports = router;
