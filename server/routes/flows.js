const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes");
const isAuthenticated = require("../middleware/isAuthenticated");
const uploadS3File = require("../utils/s3");

const multer = require("multer");
// Configured with a limit in order to prevent abuse. (Good DKV candidate!)
const limits = { files: 100, fileSize: 10 * 1024 * 1024 };
const upload = multer({ dest: "uploads/", limits: limits });

const Flow = models.flow;

router.get("/", (req, res) => {
  console.log(req.query);

  const queryKeys = Object.keys(req.query);
  let resultPromise;
  if (queryKeys.length === 0) {
    resultPromise = Flow.findAll(true);
  } else if (queryKeys.includes("search")) {
    resultPromise = Flow.findBySearchQuery(req.query.search);
  } else if (queryKeys.includes("userId")) {
    resultPromise = Flow.findByUserId(req.query.userId);
  }

  resultPromise
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
});

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

router.delete("/:flowId", (req, res) => {
  // TODO: delete S3 resources as well for any images stored there
  Flow.findByIdAndDelete(req.params.flowId)
    .then((result) => {
      if (result) {
        res.sendStatus(httpCodes.success);
      } else {
        res.sendStatus(httpCodes.notFound);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
});

// TODO: documentation comment with expected req shape?
router.post("/create", isAuthenticated, upload.any(), async (req, res) => {
  console.log("BODY", req.body);
  console.log("FILES", req.files);

  function findImageFromFiles(files, id) {
    return files.find((file) => {
      return file.fieldname == id;
    });
  }

  let flowInfo = {};
  let flowBlocks = {};

  // Retrieve flow blocks from the request body.
  // Input fields associated with the same block share a unique id (eg. url:123xyz and description:123xyz)
  // Note: alternative approach would be to use controlled components client-side so that they could just
  // submit an already well-formatted json body.
  for (const [key, value] of Object.entries(req.body)) {
    if (["flowTitle", "flowDescription"].includes(key)) {
      flowInfo[key] = value;
      continue;
    }
    const [type, id] = key.split(":");
    let block = flowBlocks[id];
    if (!block) {
      block = {};
      const img = findImageFromFiles(req.files, id);
      if (img) {
        block["imgUrl"] = await uploadS3File(img);
      }
    }
    flowBlocks[id] = Object.assign(block, { [type]: value });
  }

  const introImg = findImageFromFiles(req.files, "intro");
  if (introImg) {
    flowInfo["imgUrl"] = await uploadS3File(introImg);
  }
  // TODO: Stay denormalized with userId joining to user table for now,
  // but figure out how to profile the cost of the join, especially when fetching all flows.
  flowInfo["userId"] = req.user.firebase_id;
  flowInfo["blocks"] = Object.values(flowBlocks);
  flowInfo["numViews"] = 1;
  console.log("BLOCKS", flowInfo["blocks"]);

  const flow = new Flow(flowInfo);
  flow
    .save()
    .then((saved_flow) => {
      res.status(httpCodes.success).json({ flowId: saved_flow.id });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
});

module.exports = router;
