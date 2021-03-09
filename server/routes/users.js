var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");

const dotenv = require("dotenv");
dotenv.config({ path: "./dev_secrets/.env" });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// change to post later on and handle incoming parameters
router.post("/register", (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
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
  usersCollection = req.app.locals.db.collection("users");
  usersCollection
    .find({})
    .toArray()
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
