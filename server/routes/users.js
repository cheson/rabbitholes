const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");

const User = models.user;

// update this to use save and such for validation with mongoose
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

router.get("/", isAuthenticated, (req, res) => {
  User.findAll()
    .then((response) => {
      res.status(httpCodes.success).json(response);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(httpCodes.serverError);
    });
});

module.exports = router;
