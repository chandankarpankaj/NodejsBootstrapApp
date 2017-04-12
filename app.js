var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbrs = require('express-handlebars');
var http = require('http');
var winston = require('winston');

var page1 = require('./routes/page1');
var page2 = require('./routes/page2');
var flagChecks = require('./config/checkFlags');
var form = require('./routes/form');
var customer = require('./routes/customer');
var quote = require('./routes/quote');
var news = require('./routes/news');

var app = express();

//set app engine and default layout name
app.engine('handlebars', exphbrs({
  defaultLayout: 'main'
}))

app.set('author', 'Pankaj Chandankar');
app.set('authorLink', 'https://github.com/chandankarpankaj');
app.set('port', process.env.PORT || 8000);
app.set('allowPage3', true);
app.set('allowOtherPages', true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//static reference to private folder
app.use('/modules', express.static(__dirname + '/node_modules/'));

app.use('/', page1);
app.use('/page1', page1);
app.use('/page2', page2);

//middleware handling
app.use(['/page3','/page4'], function(req, res, next){
  winston.info('Request path : '+ req.path);
  if(!allowPage3()){
    res.render('error', {
      title: 'AppError',
      header: 'Default Error Page',
      author: req.app.get('author'),
      authorLink: req.app.get('authorLink'),
      errorMsg: 'Middleware Warning : allowPage3 flag is not set'
    });
    return;
  }
  next();
}, function(req, res, next){
  if(!flagChecks.allowOtherPages(app)){
    res.render('error', {
      title: 'AppError',
      header: 'Default Error Page',
      author: req.app.get('author'),
      authorLink: req.app.get('authorLink'),
      errorMsg: 'allowOtherPages flag is not set'
    });
    return;
  }
  next();
}, page2);

//req res handling
app.use('/form', form);
app.use('/customer', customer);
app.use('/quote', quote);
app.use('/news', news);

// TODO this will require in production deployment
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error', {
    errorMsg: 'Page Not Found'
  });
});

/*
// TODO add global error handling page for application
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

http.createServer(app).listen(app.get('port'), function(){
    winston.info('The server has started');
    winston.info('Author is ' + app.get('author'));
});

// Important to handle uncaughtException to prevent server from crashing
process.on('uncaughtException', function (err) {
    winston.log('info', '-------------- UNCAUGHT EXCEPTION: ' + err);
    winston.log('info', '------------- ERROR STACK -------------');
    winston.log('info', err.stack);
    winston.log('info', '---------------------------------------');
});

function allowPage3() {
  return app.get('allowPage3');
}

module.exports = app;
