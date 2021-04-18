const express = require("express");
const usersRoutes = require("./routes/users.js");
const models = require("./models");

const multer = require("multer");
var upload = multer({ dest: "uploads/" });

const app = express();

models.connectDb().then(async () => {
  app.listen(9000, () => {
    console.log("Example app listening on port 9000");
    //app.locals.db =
  });
});

app.use(express.static("../client/build"));
app.use(express.json());

app.use("/1/users", usersRoutes);

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item25", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("/1/flows/:flowId", (req, res) => {
  console.log(`${req.params.flowId}`);
});

app.get("*", function (req, res) {
  res.sendFile("../client/build/index.html");
});

// app.post("/createFlow", upload.single("flowImage"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

app.post("/1/createFlow", upload.any(), (req, res) => {
  console.log(req.body);
  console.log(req.files);
});
