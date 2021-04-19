const express = require("express");
const usersRoutes = require("./routes/users.js");
const flowsRoutes = require("./routes/flows.js");
const models = require("./models");
var httpCodes = require("./constants/httpCodes.js");

const app = express();

models.connectDb().then(async () => {
  app.listen(9000, () => {
    console.log("Example app listening on port 9000");
  });
});

app.use(express.static("../client/build"));
app.use(express.json());

app.use("/1/users", usersRoutes);
app.use("/1/flows", flowsRoutes);

app.get("*", function (req, res) {
  res.sendFile("../client/build/index.html");
});
