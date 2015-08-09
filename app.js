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

// Entry Routes
// Index
router.get('/entries', function(request, response, next){
  Entry.find(function(error, entries){
    if (error) response.send(error);
    response.render('entries', {title: 'Entries', entries: entries})
  });
});

// Render new view page
router.get('/entries/new', function(request, response, next){
  response.render('new', {title: 'New Entry'})
});

// Create new entry
router.post('/entries', function(request, response, next){
  var entry = new Entry();
  entry.author = request.body.author;
  entry.photo_url = request.body.photo_url;
  entry.date_taken = request.body.date_taken;
  entry.likes = request.body.likes;
});

// Show an entry
router.get('/entries/:id', function(request, response, next){
  Entry.findOne({_id: request.params.id}, function(error, entry){
    if(error) response.send(error);
    response.send('show', {title: entry.author, entry: entry})
  });
});

// Edit an entry
router.get('/entries/:id/edit', function(request, response, next){
  Entry.findOne({_id: request.params.id}, function(error, entry){
    response.render('edit', {title: 'Edit an entry', entry: entry})
  });
});

// Update an entry
router.put('/entries/:id', function(request, response, next){
  Entry.update({_id: request.params.id}, {
    author: request.body.author,
    photo_url: request.body.photo_url,
    date_taken: request.body.date_taken,
    likes: request.body.likes
  }, function(error){
      if (error) return response.send(error);
      response.redirect('/entries');
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
console.log("Magic may or not be happening on port 3000.");
