const express = require('express');


var app = module.exports = express();

app.use('/create_wallet', require('./create_wallet'));
