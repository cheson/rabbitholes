const express = require('express');
const MongoClient = require('mongodb')
const usersRoutes = require('./routes/users.js')

const dotenv = require('dotenv')
dotenv.config({path: './dev_secrets/.env'})

const app = express();

const mongo_uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@claustrophobiccluster.7kape.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
MongoClient.connect(mongo_uri, { useNewUrlParser: true })
.then(client => {
  app.locals.db = client.db('flow-website');
}).catch(error => console.error(error));

app.use(express.static('../client/build'));
app.use(express.json());

app.use('/1/users', usersRoutes)

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item25", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

app.get('/1/flows/:flowId', (req,res) => {
  console.log(`${req.params.flowId}`);
});

app.get('*', function (req, res) {
  res.sendFile('../client/build/index.html');
  });

app.listen(9000);






