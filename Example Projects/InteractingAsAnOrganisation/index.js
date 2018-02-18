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

app.use("/samples", express.static(__dirname + '/samples'));
app.use("/assets", express.static(__dirname + '/assets'));

app.use('/associate', require('./routes/associate'));

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'index.html'))
});

app.listen(port);