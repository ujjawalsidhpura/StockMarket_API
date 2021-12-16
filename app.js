//App setup
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const debug = require('debug')('backend:server');
const http = require('http');
const port = process.env.PORT || '3000';
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const cors = require('cors');

//Middleware setup
app.set('port', port);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//Start Server
server.listen(port, () => {
  console.log('App listening at ' + port)
});

module.exports = app;