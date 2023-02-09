const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

//****** begin socket.io implementation *******
const http = require("http").Server(app)
//cors enables communication across domains
const cors = require("cors")

app.use(cors())

const socketIo = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

socketIo.on('connection', (socket) => {
  console.log(`User: ${socket.id} just connected!`)
  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('a user disconnected')
  })
})

//***** end socket.io implementation ******

// logging middleware
app.use(morgan('dev'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..','public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', require('./api')); // matches all requests to /api
app.use('/auth', require('./auth')); // matches all requests to /auth

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// Send index.html for any requests that don't match one of the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle 500 Errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
