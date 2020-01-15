const express = require('express');
const menus = require('./menus');
const items = require('./items');
const { Not_Found } = require('./statusCode');

const app = express();

//routes
app.use('/api/menus', menus);
app.use('/api/items', items);
app.use('*', (req, res) => {
  res.status(Not_Found).end();
});

module.exports = app;
