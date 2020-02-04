const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(data => console.log('connected successfully'));

const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log('listening on port 300');
});
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('join', function(msg) {
    console.log('joined');
    socket.join(msg.mail);
  });
  socket.on('send', function(data) {
    console.log('send');
    socket.broadcast.emit('new_msg', { msg: data.data });
  });
});

process.on('unhandledRejection', err => {
  console.log('unhandled rejection! shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on('uncaughtException', err => {
  console.log('uncaught exception! shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
module.exports = io;
