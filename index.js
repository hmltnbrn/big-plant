var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compression = require('compression');
var cors = require('cors');

var app = express();

app.use(cors());

require('dotenv-safe').load({
  allowEmptyValues: true
});

app.use('/', express.static(path.join(__dirname, 'build')));

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

var authRouter = require('./server/auth');
var apiRouter = require('./server/api');

app.use('/api', apiRouter);
app.use('/auth', authRouter);

//Handle Main Page
app.get('/*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err.status == 500) console.error(err);
  console.log(err)
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
