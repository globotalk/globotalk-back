var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require('firebase-admin');
var twit = require('twit')

var indexRouter = require('./routes/chat-route');
var twitterRouter = require('./routes/twitter-route');

var app = express();

var port = process.env.PORT || 3000;

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var serviceAccount = require('./globo-talk-fcm-firebase-adminsdk-gm2pe-f496df5510.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.set('firebase-admin', admin);

var twitInstance = new twit({
  consumer_key:         'SvWC8u3jhuTEgHIkLvSSmdEDY',
  consumer_secret:      'zuTImpsJUP9to3jIEFMkaEmiHoDD9YS4CsX66GLXC0Wqhmq0T8',
  access_token:         '760830811260190720-XJdyIoSN7G416J7essYTY9EB2NXGpaK',
  access_token_secret:  'Y0og9oD4xajK8sJXu7T5hb0TQ2kJXcJ8j6PNMeG17xJhq',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

app.set('twit-instance', twitInstance);

app.use('/chat', indexRouter);
app.use('/twitter', twitterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log('globo talk listening on port ' + port + '!');
});

module.exports = app;
