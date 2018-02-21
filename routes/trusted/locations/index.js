const express = require('express');


var app = module.exports = express();

app.use('/add_simple_rewarding_location', require('./add_simple_rewarding_location'));

