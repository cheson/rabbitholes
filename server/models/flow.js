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
    id: mongoose.ObjectId, //is this the right syntax
    flowTitle: String,
    flowDescription: String,
    blocks: [flowBlockSchema],
    userId: String, //maybe objectid? look more into mongoose's objectid to see if its useful here
  },
  { timestamps: true }
);

flowSchema.statics.findByFlowId = async function (flowId) {
  const flow = await this.findOne({
    id: flowId,
  });

  return flow;
};

// return all flows by this user
flowSchema.statics.findByUserId = async function (userId) {
  const flows = await this.findOne({
    userId: userId,
  });

  return flows;
};

const Flow = mongoose.model("Flow", flowSchema);

module.exports = Flow;

//   {
//     flowTitle: '',
//     flowDescription: '',
//     'url:BAN_0wxsUXew1trThiI5c': '',
//     'description:BAN_0wxsUXew1trThiI5c': 'asdf',
//     'url:e53S12WCPNbgVFhyBeWbz': '',
//     'description:e53S12WCPNbgVFhyBeWbz': 'asdffds'
//   }
//   [
//     {
//       fieldname: 'BAN_0wxsUXew1trThiI5c',
//       originalname: 'geoff.gif',
//       encoding: '7bit',
//       mimetype: 'image/gif',
//       destination: 'uploads/',
//       filename: 'e794ac4ec646ebf6dc83bd7a6100bdd6',
//       path: 'uploads/e794ac4ec646ebf6dc83bd7a6100bdd6',
//       size: 14470964
//     }
//   ]

// transform into format of:
// {
//   flowTitle: xxx,
//   flowDescription: xxx,
//   flowCreator: xxx,
//   flowBlocks: [{url: xxx, description: xxx, imageUrl: xxx, optDeepDive: []}, ...]},
//   createdAt: xxx,
//   updatedAt: xxx,
// }
