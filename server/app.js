var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/data-base');
var ensureAuthenticated = require('./middleware/auth')
const cors = require('cors');
const routes = require('./routes/routes')
var app = express();
require('dotenv').config();
connectDB()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin:true,
  methods:["Get" , "Post" ,"Put" , "Delete"],
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth' , ensureAuthenticated);
app.use("/api/v1", routes); 

// Set port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
