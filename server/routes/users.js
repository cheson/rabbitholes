var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");

var serviceAccount = require("../dev_secrets/flow-website-2f43f-firebase-adminsdk-tx4es-32e589224b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// change to post later on and handle incoming parameters
router.post('/register', (req, res) => {
    console.log(req.body.name, req.body.email, req.body.id)
    usersCollection = req.app.locals.db.collection('users')
    usersCollection.find({}).toArray().then(response => {
      console.log(response);
      res.status(200).json(response);
    }).catch(error => console.error(error));
    console.log("registering new user")
});
    
module.exports = router;