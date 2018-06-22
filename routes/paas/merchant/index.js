const express = require('express');


var app = module.exports = express();

app.use('/add_expected_payment', require('./add_expected_payment'));
app.use('/get_qr_code', require('./get_qr_code'));

