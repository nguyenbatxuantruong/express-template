const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('./middlewares/morgan.middleware'));
app.use(require('./middlewares/logger.middleware'));
app.use('/api', require('./routes'));
app.use(express.static(path.join(__dirname, 'frontend/build')));

module.exports = app;
