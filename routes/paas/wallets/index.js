const express = require('express');


var app = module.exports = express();

app.use('/create_wallet', require('./create_wallet'));
app.use('/query_balance', require('./query_balance'));
app.use('/query_account', require('./query_account'));
