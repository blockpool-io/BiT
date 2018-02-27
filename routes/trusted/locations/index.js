const express = require('express');


var app = module.exports = express();

app.use('/add_simple_rewarding_location', require('./add_simple_rewarding_location'));
app.use('/associate_user_to_location', require('./associate_user_to_location'));
app.use('/list_locations', require('./list_locations'));
app.use('/query_location', require('./query_location'));
app.use('/record_movement', require('./record_movement'));

