const mongoose = require("mongoose");
const User = require("./user");
const { Schema } = mongoose;

const extraBlockSchema = new Schema({
  url: String,
  description: String,
  imgUrl: String,
});

const flowBlockSchema = new Schema({
  url: String,
  description: String,
  imgUrl: String,
  extraFlow: [extraBlockSchema],
});

const flowSchema = new Schema(
  {
    flowTitle: String,
    flowDescription: String,
    blocks: [flowBlockSchema],
    userId: String,
    numViews: Number,
  },
  { timestamps: true }
);

flowSchema.statics.findAll = async function () {
  return await this.find();
};

// TODO: improve error handling and propagate back to client
flowSchema.statics.findByFlowIdAndIncNumViews = async function (flowId) {
  if (!mongoose.Types.ObjectId.isValid(flowId)) {
    throw new Error("bad id");
  }
  const flow = await this.findByIdAndUpdate(
    {
      _id: flowId,
    },
    { $inc: { numViews: 1 } },
    { new: true }
  );

  if (!flow) {
    throw new Error("not found");
  }

  return flow;
};

flowSchema.statics.findByUserId = async function (userId) {
  const flows = await this.find({
    userId: userId,
  });

  return flows;
};

const Flow = mongoose.model("Flow", flowSchema);

module.exports = Flow;
