var express = require('express');
var app = express();
var task = require('./routes/task');
var bodyParser = require('body-parser');
var path = require('path');

// middleware running
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/task', task);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/landing.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
