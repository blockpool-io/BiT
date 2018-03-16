const express = require('express');


var app = module.exports = express();

app.use('/wallets', require('./wallets'));
app.use('/transactions', require('./transactions'));

