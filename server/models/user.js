const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firebase_id: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findAll = async function () {
  return await this.find();
};

userSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({
    email: email,
  });
  return user;
};

// TODO: use this pre hook eventually to delete all flows associated with user
// userSchema.pre('remove', function(next) {
//     this.model('Message').deleteMany({ user: this._id }, next);
// });

const User = mongoose.model("User", userSchema);

module.exports = User;

// once mongoose is added, add a handler to submit form (maybe we can just ignore images for now and write them over as null)
