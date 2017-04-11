var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.json({
    userId: 'Pankaj123',
    userName: 'Pankaj',
    userType: 'Admin',
    author: req.app.get('author')
  });
});

module.exports = router;
