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
  res.json({ flow: "exampleFlow" });
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

  for (const [key, value] of Object.entries(req.body)) {
    if (["flowTitle", "flowDescription"].includes(key)) {
      flowInfo[key] = value;
    } else {
      // Input fields associated with the same block share a unique id (eg. url:123xyz and description:123xyz)
      const [type, id] = key.split(":");
      let block = flowBlocks[id];
      if (!block) {
        block = {};
        const img = req.files.find((file) => {
          return file.fieldname == id;
        });
        if (img) {
          block["imgUrl"] = uploadImageToS3(img);
          console.log("img urling");
        }
      }
      flowBlocks[id] = Object.assign(block, { [type]: value });
    }
  }
  flowInfo["userId"] = "[req.userId]";
  flowInfo["blocks"] = Object.values(flowBlocks);

  console.log(flowInfo);
  // TODO: actually write flowInfo with mongoose to db now
  // Flow.updateOne(
  //   {firebase_id: decodedToken.uid},
  //   {
  //     firebase_id: decodedToken.uid,
  //     name: decodedToken.name,
  //     email: decodedToken.email,
  //   },
  //   {upsert: true}
  // ).then((result) => {
  //   console.log(result);
  //   if (result.nModified + result.upserted.length > 0) {
  //     res.sendStatus(httpCodes.success);
  //   } else {
  //     res.sendStatus(httpCodes.serverError);
  //   }
  // })

  res
    .status(httpCodes.success)
    .json({ example: "this would be the created flow" });
});

module.exports = router;
