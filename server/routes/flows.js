var express = require("express");
var router = express.Router();
// var admin = require("firebase-admin");
var models = require("../models");
var httpCodes = require("../constants/httpCodes")

const multer = require("multer");
var upload = multer({ dest: "uploads/" });

// const dotenv = require("dotenv");
// dotenv.config({ path: "./dev_secrets/.env" });

// var serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const Flow = models.flow;

router.get("/:flowId", (req, res) => {
  console.log(`${req.params.flowId}`);
  res.json({flow: "exampleFlow"});
});

// TODO: only authed users should be able to create, and their userid should be associated with the flow
router.post("/create", upload.any(), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    // defaults to 200 already, but this just shows setting status and json in response
    res.status(httpCodes.success).json({example: "this would be the created flow"});

  // User.findAll()
  //   .then((response) => {
  //     console.log(response);
  //     res.status(httpCodes.success).json(response);
  //   })
  //   .catch((error) => console.error(error));
});

module.exports = router;
