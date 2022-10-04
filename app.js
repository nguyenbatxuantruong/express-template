const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const rfs = require('rotating-file-stream') // version 2.x

const app = express()

// app.use(logger('dev'));
// app.use(logger('common', { 
//   stream: rfs.createStream('access.log', {
//     interval: '1d', // rotate daily
//     path: path.join(__dirname, 'log')
//   }) 
// }));
app.use(require("./middlewares/morgan.middleware"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res) => {
  console.log(req.body); // this is what you want
  res.on("finish", () => {
    console.log(res);
  });

});
app.use('/api', require('./routes'));
app.use(express.static(path.join(__dirname, 'frontend/build')));

module.exports = app;
