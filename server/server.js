const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const http = require("http").Server(app);
const socket = require('socket.io');
// cors enables security for cross-domain communication
// const cors = require("cors");

// app.use(cors());

// const io = socket(http, {
//   cors: {
//     origin: 'http://localhost:3000'
//   }
// });

const io = socket(http);

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

io.on('connection', (socket) => {
  console.log(`User: ${socket.id} just connected!`);

  socket.on('add-list', (newList) => {
    socket.broadcast.emit('add-list', newList);
  })

  socket.on('move-list', (newList, newOtherList) => {
    socket.broadcast.emit('move-list', {newList, newOtherList});
  });
  
  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('a user disconnected')
  });
});

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// Send index.html for any requests that don't match one of the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

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

// Handle 500 Errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = http;
