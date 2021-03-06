var express = require('express');
var router = express.Router();
var winston = require('winston');
var request = require('request');

router.get('/', getNewsSourcesData);
router.get('/sources', getNewsSourcesDataAjax);
router.get('/articles/:source', getNewsArticlesDataAjax);

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
      var newsSourceResp = JSON.parse(body);
      // winston.info('News sources: ' + newsSources);
      res.render('news', {
        title: 'TopNews',
        header: 'Global Top News',
        author: req.app.get('author'),
        authorLink: req.app.get('authorLink'),
        newsSources: newsSourceResp.sources
      });
      return;
    } else {
      winston.error(response);
      res.render('error',{
        title: 'ErrorPage',
        header: 'Error Information',
        author: req.app.get('author'),
        authorLink: req.app.get('authorLink'),
        errorMsg: 'Error while fetching news sources'
      })
      return;
    }
  };
  request.get(options, fetchNewsSourcesCallback);
};

function getNewsSourcesDataAjax(req, res){

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

function getNewsArticlesDataAjax(req, res){

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
