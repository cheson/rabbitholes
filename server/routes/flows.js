const express = require("express");
const router = express.Router();
const models = require("../models");
const httpCodes = require("../constants/httpCodes");
const isAuthenticated = require("../middleware/isAuthenticated");
const s3 = require("../utils/s3");
const mongoose = require("mongoose");

const multer = require("multer");
// Configured with a limit in order to prevent abuse. (Good DKV candidate!)
const limits = { files: 100, fileSize: 10 * 1024 * 1024 };
const upload = multer({ dest: "uploads/", limits: limits });

const Flow = models.flow;

router.get("/", (req, res) => {
  const queryKeys = Object.keys(req.query);
  let resultPromise;
  if (queryKeys.length === 0) {
    resultPromise = Flow.findAll();
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
  let dbResult =
    req.params.flowId == "featured"
      ? Flow.findByFlowIds([
          "60de0b095a865b82f7e639e9", // Exploring the Internet
          "60e5244a480a530013aeed04", // Snowboarding
          "60d3b5901273292a7d911f24",
          "60d3b59f1273292a7d911f26",
        ])
      : Flow.findByFlowIdAndIncNumViews(req.params.flowId);
  dbResult
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(httpCodes.serverError);
    });
});

function gatherImgURLs(flow) {
  let imgURLs = [];
  if (flow.imgUrl) {
    imgURLs.push(flow.imgUrl);
  }
  if (flow.blocks) {
    flow.blocks.forEach((block) => {
      if (block.imgUrl) {
        imgURLs.push(block.imgUrl);
      }
    });
  }
  return imgURLs;
}

router.delete("/:flowId", isAuthenticated, async (req, res) => {
  let flow = await Flow.findById(req.params.flowId);

  if (req.user.firebase_id != flow.userId) {
    res.sendStatus(httpCodes.unauthorized);
  }

  Flow.findByIdAndDelete(req.params.flowId)
    .then((result) => {
      if (result) {
        s3.deleteS3Files(gatherImgURLs(result));
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

function findImageFromFiles(files, id) {
  return files.find((file) => {
    return file.fieldname == id;
  });
}

router.put("/:flowId", isAuthenticated, upload.any(), async (req, res) => {
  let flow = await Flow.findById(req.params.flowId);

  if (req.user.firebase_id != flow.userId) {
    res.sendStatus(httpCodes.unauthorized);
  }

  let processedImgIds = new Set();
  let newIdMap = {};
  let updatedBlocks = new Map();

  for (const [key, value] of Object.entries(req.body)) {
    if (["flowTitle", "flowDescription"].includes(key)) {
      flow[key] = value;
      continue;
    }
    let [type, id] = key.split(":");
    id = newIdMap[id] || id;
    let block =
      updatedBlocks.get(id) ||
      flow.blocks.find((target) => target._id == id) ||
      (function () {
        const newId = mongoose.Types.ObjectId();
        newIdMap[id] = newId;
        id = newId;
        return { _id: id };
      })();
    block[type] = value;

    // Hacky way to only process images once, can certainly be improved.
    if (!processedImgIds.has(id)) {
      const img = findImageFromFiles(req.files, id);
      if (img) {
        block["imgUrl"] = await s3.uploadS3File(img);
      }
      processedImgIds.add(id);
    }

    updatedBlocks.set(id, block);
  }

  const introImg = findImageFromFiles(req.files, "intro");
  if (introImg) {
    flow["imgUrl"] = await s3.uploadS3File(introImg);
  }

  flow.blocks = Array.from(updatedBlocks.values());

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

// TODO: documentation comment with expected req shape?
router.post("/create", isAuthenticated, upload.any(), async (req, res) => {
  let flowInfo = {};
  let flowBlocks = new Map(); // Map preserves order of insertion when iterating over key/values later

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
    let block = flowBlocks.get(id);
    if (!block) {
      block = {};
      const img = findImageFromFiles(req.files, id);
      if (img) {
        block["imgUrl"] = await s3.uploadS3File(img);
      }
    }
    flowBlocks.set(id, Object.assign(block, { [type]: value }));
  }

  const introImg = findImageFromFiles(req.files, "intro");
  if (introImg) {
    flowInfo["imgUrl"] = await s3.uploadS3File(introImg);
  }
  // TODO: Stay denormalized with userId joining to user table for now,
  // but figure out how to profile the cost of the join, especially when fetching all flows.
  flowInfo["userId"] = req.user.firebase_id;
  flowInfo["blocks"] = Array.from(flowBlocks.values());
  flowInfo["numViews"] = 1;

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
