const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes.js");

const User = models.user;

router.post("/register", (req, res) => {
  req.app.locals.firebaseAdmin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
      console.log(decodedToken);
      User.updateOne(
        { firebase_id: decodedToken.uid },
        {
          firebase_id: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email,
        },
        { upsert: true }
      ).then((result) => {
        console.log(result);
        if (result.nModified + result.upserted.length > 0) {
          res.sendStatus(httpCodes.success);
        } else {
          res.sendStatus(httpCodes.serverError);
        }
      });
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
