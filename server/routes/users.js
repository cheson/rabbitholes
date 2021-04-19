var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var models = require("../models");
var httpCodes = require("../constants/httpCodes.js");

const dotenv = require("dotenv");
dotenv.config({ path: "./dev_secrets/.env" });

var serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

// TODO: like the client side, I think this needs to be shared among all api calls to check for login status
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const User = models.user;

router.post("/register", (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
      console.log(decodedToken);
      User.updateOne(
        {firebase_id: decodedToken.uid},
        {
          firebase_id: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email,
        },
        {upsert: true}
      ).then((result) => {
        console.log(result);
        if (result.nModified + result.upserted.length > 0) {
          res.sendStatus(httpCodes.success);
        } else {
          res.sendStatus(httpCodes.serverError);
        }
      })
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
  console.log("registering new user");
});

router.get("/", (req, res) => {
  User.findAll()
    .then((response) => {
      console.log(response);
      res.status(httpCodes.success).json(response);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
