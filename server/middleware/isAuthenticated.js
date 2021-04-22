const httpCodes = require("../constants/httpCodes.js");

module.exports = function isAuthenticated(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.sendStatus(httpCodes.unauthorized);
    }
  };