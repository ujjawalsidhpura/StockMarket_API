//App setup
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const port = process.env.PORT || '3000';
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const cors = require('cors');
const mongoDb = require('./mongoDb');

//Middleware setup
app.set('port', port);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//MongoDB connection
mongoDb.connectToServer(function (err) {
  //App goes online once this callback occurs

  //Main Routes
  const usersRouter = require('./routes/users');

  app.use('/users', usersRouter);

  //Handle 404 
  app.use(function (req, res, next) {
    next(createError(404));
  });

  //Handle 500
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send('Error')
  });
})

//Start Server
server.listen(port, () => {
  console.log('App listening at ' + port);
});

module.exports = app;