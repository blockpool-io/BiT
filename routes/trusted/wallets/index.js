const express = require('express');


var app = module.exports = express();

app.use('/associate', require('./associate'));
app.use('/query_account', require('./query_account'));
app.use('/query_balance', require('./query_balance'));
app.use('/create_wallet', require('./create_wallet'));
app.use('/send_funds', require('./send_funds'));

