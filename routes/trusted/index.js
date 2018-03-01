const express = require('express');


var app = module.exports = express();

app.use('/wallets', require('./wallets'));
app.use('/locations', require('./locations'));
app.use('/merchant', require('./merchant'));

