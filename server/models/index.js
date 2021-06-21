const mongoose = require("mongoose");
const User = require("./user");
const Flow = require("./flow");

const connectDb = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@${process.env.MONGO_DB_CLUSTER_URL}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useFindAndModify: false }
  );
};

module.exports = {
  connectDb: connectDb,
  user: User,
  flow: Flow,
};

// TODO: understand the implications here with queries vs promises: https://mongoosejs.com/docs/queries.html#queries-are-not-promises
