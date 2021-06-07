const express = require("express");
const usersRoutes = require("./routes/users.js");
const flowsRoutes = require("./routes/flows.js");
const models = require("./models");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const setCurrentFirebaseUser = require("./middleware/setCurrentFirebaseUser.js");

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
  const port = process.env.PORT || 9000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(function(err) {
  console.log(err);
});

const isProduction = (process.env.NODE_ENV || "dev").toLowerCase() == "production";
const buildDirectory = isProduction ? "./build" : "../client/build";

app.use(express.static(buildDirectory));
app.use(express.json());
app.use(setCurrentFirebaseUser);

app.use("/1/users", usersRoutes);
app.use("/1/flows", flowsRoutes);

app.get("*", function (req, res) {
  res.sendFile(buildDirectory + "/index.html");
});
