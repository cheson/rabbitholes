const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes");

const multer = require("multer");
// Servers can be configured with a size limit for files and HTTP requests in order to prevent abuse. (Good DKV candidate!)
const limits = { files: 100, fileSize: 10 * 1024 * 1024 };
const upload = multer({ dest: "uploads/", limits: limits });

const Flow = models.flow;

router.get("/:flowId", (req, res) => {
  console.log(`${req.params.flowId}`);
  Flow.findByFlowId(req.params.flowId).then((result) => {
    res.json(result);
  });
});

function uploadImageToS3(img) {
  // stub image url for eventual S3/image storage
  return "https://picsum.photos/300/200";
}

// TODO: need to figure out a way to abstract the "authenticated" logic check on the server side, custom middleware?
// https://expressjs.com/en/guide/writing-middleware.html
// TODO: comment with expected req shape
router.post("/create", upload.any(), (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let flowInfo = {};
  let flowBlocks = {};

  // Retrieve flow blocks from the request body.
  // Input fields associated with the same block share a unique id (eg. url:123xyz and description:123xyz)
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

  // Note: for updates? worry about this later
  if (req.body["flowId"]) {
    flowInfo["_id"] = req.body["flowId"];
  }

  flowInfo["userId"] = "[req.userId]";
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
