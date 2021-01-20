const nJwt = require("njwt");
const jwt = require("jwt-decode");

//This middleware validate the incoming JWT token. Extracts the userId.
//and add them to the request body.
const auth = (req, res, next) => {
  const jwtToken = req.cookies.app_auth_token;

  nJwt.verify(jwtToken, process.env.JWT_SECRET, function (err, verifiedJwt) {
    if (err) {
      res.status(401).send("Invalid or expired token");
      return;
    } else {
      const decodedToken = jwt(jwtToken);
      const { user_id, email } = decodedToken;
      req.userId = user_id;
      req.email = email; //not sure if email would be needed but I will include here for now
      next();
    }
  });
};

module.exports = auth;
