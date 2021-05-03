const mongoose = require("mongoose");
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

// https://mongoosejs.com/docs/populate.html#populate-virtuals
flowSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "firebase_id",
  justOne: true,
});
flowSchema.set("toObject", { virtuals: true });
flowSchema.set("toJSON", { virtuals: true });

flowSchema.statics.findAll = async function (withUserInfo = false) {
  if (withUserInfo) {
    return await this.find().populate({
      path: "user",
      select: "firebase_id email name username -_id",
    });
  }
  return await this.find().select("-userId");
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
