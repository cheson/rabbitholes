const express = require("express");
const usersRoutes = require("./routes/users.js");
const flowsRoutes = require("./routes/flows.js");
const models = require("./models");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

const app = express();

function initializeFirebaseAdmin(app) {
  dotenv.config({ path: "./dev_secrets/.env" });
  const serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  app.locals.firebaseAdmin = admin;
}

models.connectDb().then(async () => {
  initializeFirebaseAdmin(app);
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
