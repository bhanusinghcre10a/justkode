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
const port = 3000;

const server = app.listen(port, () => {
  console.log('listening on port 300');
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
