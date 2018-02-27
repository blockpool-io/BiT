const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8000;


app.use(cors());
app.options('*', cors()) // include before other routes
// Body Parser Middleware to allow form parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/examples", express.static(__dirname + '/examples'));
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/images", express.static(__dirname + '/images'));

app.use('/trusted', require('./routes/trusted'));
app.use('/paas', require('./routes/paas'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port);