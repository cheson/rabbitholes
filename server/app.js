const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('../client/build'));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item25", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('*', function (req, res) {
  res.sendFile('../client/build/index.html');
});

app.listen(9000);
