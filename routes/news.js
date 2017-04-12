var express = require('express');
var router = express.Router();

router.get('/', getNewsData);

function getNewsData(req, res){
  res.render('news', {
    title: 'TopNews',
    header: 'Global Top News',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  })
};

module.exports = router;
