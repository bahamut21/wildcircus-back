const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');
const user = require('./routes/user');
const event = require('./routes/event');
const admin = require('./routes/admin');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // a placer avant app.use

app.use('/', indexRouter);
app.use('/api/user', user);
app.use('/api/event', event);
app.use('/api/admin', admin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
