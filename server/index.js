const express = require('express');
const app = express();
const PORT = 5174;

const http = require('http').Server(app);
const cors = require('cors');
const { computeLeaderboard, randomScoreUpdate } = require('./services/scoreService');

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.on('ping', (count) => {
    console.log(`${socket.id} PING! Count: ${count}`);
  })
  // Immediately send the current leaderboard
  socket.emit('leaderboard_update', computeLeaderboard());

  socket.on('message', (message) => {
    console.log(`${socket.id}  ${message}`);
  })
});


randomScoreUpdate(socketIO)

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});