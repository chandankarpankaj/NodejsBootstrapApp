var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', getCallback);

router.post('/new', newQuoteCallback);

function getCallback(req, res){
  res.render('quote', {
    title: 'Quote'
  })
}

function newQuoteCallback(req, res){
  var options = {
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
      method: "GET",
      headers: {
        'X-Mashape-Key': process.env.MASHAPE_KEY,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
      }
    };

    function fetchQuoteCallback(error, response, body){
      if(!error && response.statusCode == 200) {
        res.send(JSON.stringify(body))
      }
    }

    request(options, fetchQuoteCallback);
}

module.exports = router;
