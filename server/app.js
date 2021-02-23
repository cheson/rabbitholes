const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('../client/build'));

app.get('/*', function (req, res) {
  res.sendFile('../client/build/index.html');
});

app.listen(9000);
