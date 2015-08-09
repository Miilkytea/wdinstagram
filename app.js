var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var http = require('http');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var port = process.env.PORT || 3000;
var app = express();
var routes = require('./routes/index');

mongoose.connect('mongodb://localhost/wdinstagram');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Source in the models
var Entry = require('./models/Entry');
var entry = new Entry();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Destroy an entry
router.delete('/entries/:id', function(request, response, next){
  Entry.findByIdAndRemove(request.params.id, function(error){
    if(error) response.send(error);
    response.redirect('/entries');
  });
});

module.exports = app;

var server = http.createServer(app);
server.listen(port);
console.log("Magic may or may not be happening on port 3000.");
