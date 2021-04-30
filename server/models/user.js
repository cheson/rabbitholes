const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firebase_id: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    /* An index that is both sparse and unique prevents collection from having documents
    with duplicate values for a field but allows multiple documents that omit the key.
    https://docs.mongodb.com/manual/core/index-sparse/#sparse-and-unique-properties */
    username: {
      type: String,
      unique: true,
      sparse: true,
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
