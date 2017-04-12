var express = require('express');
var router = express.Router();
var request = require('request');
var winston = require('winston');

router.get('/', getNewsData);
router.get('/sources', getNewsSourcesData);
router.get('/articles/:source', getNewsArticlesData);

function getNewsData(req, res){
  res.render('news', {
    title: 'TopNews',
    header: 'Global Top News',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  });
};

function getNewsSourcesData(req, res){

  //fetch news resources here
  var options = {
    url: "https://newsapi.org/v1/sources?language=en",
    method: "GET",
    headers: {
      'Accept' : 'application/json'
    }
  };
  function fetchNewsSourcesCallback(error, response, body){
    if(!error && response.statusCode == 200) {
      var newsSources = JSON.stringify(body);
      // winston.info('News sources: ' + newsSources);
      res.send(newsSources);
    } else {
      winston.error(response);
    }
  };
  request.get(options, fetchNewsSourcesCallback);
};

function getNewsArticlesData(req, res){

  var source = req.params.source;
  winston.info('News source: ' + source);
  var key = req.app.get('NEWS_API_KEY');
  var articlesUri = "https://newsapi.org/v1/articles?source="+source+"&apiKey="+key;
  winston.info('News url: ' + articlesUri);

  //fetch news articles here
  var options = {
    url: articlesUri,
    method: "GET",
    headers: {
      'Accept' : 'application/json'
    }
  };
  function fetchNewsArticlesCallback(error, response, body){
    if(!error && response.statusCode == 200) {
      var newsArticles = JSON.stringify(body);
      winston.info('News articles: ' + newsArticles);
      res.send(newsArticles);
    } else {
      winston.error(response);
    }
  };
  request.get(options, fetchNewsArticlesCallback);
};

module.exports = router;
