const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes");
const isAuthenticated = require("../middleware/isAuthenticated.js");

const multer = require("multer");
// Configured with a limit in order to prevent abuse. (Good DKV candidate!)
const limits = { files: 100, fileSize: 10 * 1024 * 1024 };
const upload = multer({ dest: "uploads/", limits: limits });

const Flow = models.flow;

router.get("/:flowId", (req, res) => {
  Flow.findByFlowIdAndIncNumViews(req.params.flowId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
});

function uploadImageToS3(img) {
  // Stub image url for eventual S3/image storage
  return "https://picsum.photos/300/200";
}

// TODO: documentation comment with expected req shape?
router.post("/create", isAuthenticated, upload.any(), (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let flowInfo = {};
  let flowBlocks = {};

  // Retrieve flow blocks from the request body.
  // Input fields associated with the same block share a unique id (eg. url:123xyz and description:123xyz)
  // Note: alternative approach would be to use controlled components client-side so that they could just
  // submit an already well-formatted json body.
  for (const [key, value] of Object.entries(req.body)) {
    const [type, id] = key.split(":");
    let block = flowBlocks[id];
    if (!block) {
      block = {};
      const img = req.files.find((file) => {
        return file.fieldname == id;
      });
      if (img) {
        block["imgUrl"] = uploadImageToS3(img);
      }
    }
    flowBlocks[id] = Object.assign(block, { [type]: value });
  }

  flowInfo["userId"] = req.user.firebase_id;
  flowInfo["flowTitle"] = req.body["flowTitle"];
  flowInfo["flowDescription"] = req.body["flowDescription"];
  flowInfo["blocks"] = Object.values(flowBlocks);

  const flow = new Flow(flowInfo);
  flow
    .save()
    .then((saved_flow) => {
      console.log(saved_flow);
      res
        .status(httpCodes.success)
        .json({ example: "this would be the created flow" });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
});

module.exports = router;
