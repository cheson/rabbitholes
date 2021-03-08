var express = require('express');
var router = express.Router();

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