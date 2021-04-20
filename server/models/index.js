const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./user");
const Flow = require("./flow");

dotenv.config({ path: "./dev_secrets/.env" });

const connectDb = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@claustrophobiccluster.8051k.mongodb.net/flow-website?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
};

module.exports = {
  connectDb: connectDb,
  user: User,
  flow: Flow,
};
