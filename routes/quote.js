var express = require('express');
var router = express.Router();
var request = require('request');
var winston = require('winston');

router.get('/', getCallback);

router.post('/new', newQuoteCallback);

function getCallback(req, res){
  res.render('quote', {
    title: 'Quote',
    header: 'Good thoughts by great people',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  })
}

function newQuoteCallback(req, res){
  var options = {
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
      method: "GET",
      headers: {
        'X-Mashape-Key': req.app.get('MASHAPE_KEY'),
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
      }
    };

    function fetchQuoteCallback(error, response, body){
      if(!error && response.statusCode == 200) {
        var quote = JSON.stringify(body);
        winston.info(quote);
        res.send(quote);
      }
    }

    request(options, fetchQuoteCallback);
}

module.exports = router;
