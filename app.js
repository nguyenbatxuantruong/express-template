const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express()

app.use(require('./middlewares/morgan.middleware'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.body, req.method, req.url, req.hostname); // this is what you want
  res.on("finish", () => {
    console.log(res.statusCode);
  });
  next();
});
app.use('/api', require('./routes'));
app.use(express.static(path.join(__dirname, 'frontend/build')));

module.exports = app;
