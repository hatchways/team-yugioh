const nJwt = require("njwt");
const jwt = require("jwt-decode");

//This middleware validate the incoming JWT token. Extracts the userId.
//and add them to the request body.
const auth = (req, res, next) => {
  const jwtToken = req.cookies.app_auth_token || undefined;
  if (!jwtToken) {
    res.status(401).send("Authentication token not included in cookies");
    return;
  }

  nJwt.verify(jwtToken, process.env.JWT_SECRET, function (err, verifiedJwt) {
    if (err) {
      console.log("error here");
      console.log(err);
      res.status(401).send("Invalid or expired token");

      return;
    } else {
      const decodedToken = jwt(jwtToken);
      const { userId } = decodedToken;
      req.userId = userId;
      next();
    }
  });
};

module.exports = auth;
