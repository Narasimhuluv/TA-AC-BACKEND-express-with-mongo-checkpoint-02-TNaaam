var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var eventRouter = require('./routes/events');
var commentRouter = require('./routes/comment');
var categoryRouter = require('./routes/category');
var locationRouter = require('./routes/location');
var dateRouter = require('./routes/date');

var app = express();

// connecting to Database 
mongoose.connect('mongodb://localhost/eventManagement', {useNewUrlParser : true, useUnifiedTopology : true}, (err) => {
  console.log(err ? err : "Connected to Database")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', eventRouter);
app.use('/comments', commentRouter);
app.use('/categories', categoryRouter);
app.use('/location', locationRouter);
app.use('/date', dateRouter);

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

module.exports = app;
