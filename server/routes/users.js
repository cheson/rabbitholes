var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var models = require("../models");

const dotenv = require("dotenv");
dotenv.config({ path: "./dev_secrets/.env" });

var serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const User = models.models.User;
console.log(models);

// change to post later on and handle incoming parameters
router.post("/register", (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
      console.log(decodedToken);
      const query = { firebase_id: decodedToken.uid };
      const update = {
        $set: {
          firebase_id: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email,
        },
      };
      const options = { upsert: true };
      usersCollection = req.app.locals.db.collection("users");
      usersCollection.updateOne(query, update, options);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
  console.log("registering new user");
});

router.get("/", (req, res) => {
  console.log(models);
  User.find()
    // .toArray()
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
