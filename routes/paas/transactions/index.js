const express = require('express');


var app = module.exports = express();

app.use('/calculate_fee', require('./calculate_fee'));
app.use('/send_funds', require('./send_funds'));
