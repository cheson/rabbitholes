const isProduction = (process.env.NODE_ENV || "dev").toLowerCase() == "production";
const buildDirectory = isProduction ? __dirname + "/build" : "../client/build";
if (!isProduction) {
  const dotenv = require("dotenv");
  dotenv.config({ path: "./dev_secrets/.env" });
}

const express = require("express");
const usersRoutes = require("./routes/users.js");
const flowsRoutes = require("./routes/flows.js");
const models = require("./models");
const admin = require("firebase-admin");
const setCurrentFirebaseUser = require("./middleware/setCurrentFirebaseUser.js");

const app = express();

function initializeFirebaseAdmin(app) {
  const serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  app.locals.firebaseAdmin = admin;
}

models.connectDb().then(async () => {
  initializeFirebaseAdmin(app);
  const port = process.env.PORT || 8888;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(function(err) {
  console.log(err);
});

app.use(express.static(buildDirectory));
app.use(express.json());
app.use(setCurrentFirebaseUser);

app.use("/1/users", usersRoutes);
app.use("/1/flows", flowsRoutes);

app.get("*", function (req, res) {
  res.sendFile(buildDirectory + "/index.html");
});
