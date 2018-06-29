const express = require('express');


var app = module.exports = express();

app.use('/create_wallet', require('./create_wallet'));
app.use('/bulk_create_wallets', require('./bulk_create_wallets'));
app.use('/query_balance', require('./query_balance'));
app.use('/query_account', require('./query_account'));
app.use('/multi_signature_address', require('./multi_signature_address'));
