#!/usr/bin/node

var express = require('express');
var PORT = 8585;
var app = express.createServer();
app.use('/', express.static(__dirname + '/'));
app.listen(PORT);
console.log("Server started on port: " + PORT);
