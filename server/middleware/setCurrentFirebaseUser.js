module.exports = function setCurrentUser(req, res, next) {
  if (req.headers["authorization"]) {
    req.app.locals.firebaseAdmin
      .auth()
      .verifyIdToken(req.headers["authorization"])
      .then((decodedToken) => {
        console.log(decodedToken);
        req.user = {
          firebase_id: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email,
        };
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => next());
  } else {
    next();
  }
};
