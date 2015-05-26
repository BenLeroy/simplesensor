'use strict';

var express = require('express');

var app = express();

app.use(express.static('./client/'));

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('index.html');
});

app.listen(3000);
