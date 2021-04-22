module.exports = function setCurrentUser(req, res, next) {
  if (req.body.token) {
      req.app.locals.firebaseAdmin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        req.user = {
          firebase_id: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email,
        };
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(httpCodes.serverError);
      });
    }

    next();
  };