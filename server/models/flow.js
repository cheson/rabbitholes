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
    imgUrl: String,
    blocks: [flowBlockSchema],
    userId: String,
    numViews: Number,
  },
  { timestamps: true }
);

flowSchema.index({ "$**": "text" });

// https://mongoosejs.com/docs/populate.html#populate-virtuals
flowSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "firebase_id",
  justOne: true,
});
flowSchema.set("toObject", { virtuals: true });
flowSchema.set("toJSON", { virtuals: true });

function withUserInfo(flows) {
  return flows.populate({
    path: "user",
    select: "firebase_id email name username -_id",
  });
}

flowSchema.statics.findAll = async function () {
  return await this.find().populate({
    path: "user",
    select: "firebase_id email name username -_id",
  });
};

// TODO: improve error handling and propagate back to client
flowSchema.statics.findByFlowIdAndIncNumViews = async function (flowId) {
  if (!mongoose.Types.ObjectId.isValid(flowId)) {
    throw new Error("bad id");
  }
  const flow = await withUserInfo(
    this.findByIdAndUpdate(
      {
        _id: flowId,
      },
      { $inc: { numViews: 1 } },
      { new: true }
    )
  );

  if (!flow) {
    throw new Error("not found");
  }

  return flow;
};

flowSchema.statics.findByFlowIds = async function (flowIdArr) {
  const flows = await withUserInfo(
    this.find({
      _id: {
        $in: flowIdArr.map((id) => mongoose.Types.ObjectId(id)),
      },
    })
  );

  return flows;
};

flowSchema.statics.findByUserId = async function (userId) {
  const flows = await withUserInfo(
    this.find({
      userId: userId,
    })
  );

  return flows;
};

flowSchema.statics.findBySearchQuery = async function (searchQuery) {
  const flows = await withUserInfo(
    this.find(
      { $text: { $search: searchQuery } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })
  );

  return flows;
};

const Flow = mongoose.model("Flow", flowSchema);

module.exports = Flow;
