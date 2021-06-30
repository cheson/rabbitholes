const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");
const uploadS3File = require("../utils/s3");

const multer = require("multer");
// Configured with a limit in order to prevent abuse. (Good DKV candidate!)
const limits = { files: 1, fileSize: 10 * 1024 * 1024 };
const upload = multer({ dest: "uploads/", limits: limits });

const User = models.user;
const Flow = models.flow;

// update this to use save and such for validation with mongoose
router.post("/register", (req, res) => {
  req.app.locals.firebaseAdmin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
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

router.put("/:userId", isAuthenticated, upload.any(), async (req, res) => {
  let user = await User.findOne({ firebase_id: req.params.userId });
  if (!user) {
    res.sendStatus(httpCodes.notFound);
  } else {
    try {
      let updatedFields = req.body;
      if (req.files.length > 0) {
        updatedFields["profilePictureURL"] = await uploadS3File(req.files[0]);
      }
      // TODO: should be possible to just call update on the user object already found earlier
      const updatedUser = await User.findOneAndUpdate(
        { firebase_id: req.params.userId },
        updatedFields,
        { new: true }
      );
      res.status(httpCodes.success).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.sendStatus(httpCodes.serverError);
    }
  }
});

router.delete("/:userId", isAuthenticated, async (req, res) => {
  // Note: using mongoose hooks is another possible implementation
  let user = await User.findOne({ firebase_id: req.params.userId });
  if (!user) {
    res.sendStatus(httpCodes.notFound);
  } else {
    try {
      await Flow.deleteMany({ userId: req.params.userId });
      await User.deleteOne({ firebase_id: req.params.userId });
      res.sendStatus(httpCodes.success);
    } catch (err) {
      console.log(err);
      res.sendStatus(httpCodes.serverError);
    }
  }
});

module.exports = router;
