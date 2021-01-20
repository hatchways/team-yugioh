const nJwt = require("njwt");
const jwt = require("jwt-decode");

//This middleware validate the incoming JWT token. Extracts the user_id.
//and add them to the request body.
const auth = (req, res, next) => {
    const jwtToken = req.cookies.app_auth_token;

    nJwt.verify(jwtToken, process.env.JWT_SECRET, function (err, verifiedJwt) {
        if (err) {
            res.status(401).send("Invalid or expired token");
            return;
        } else {
            const decodedToken = jwt(jwtToken);
            const { user_id } = decodedToken;
            req.user_id = user_id;
            next();
        }
    });
};

module.exports = auth;
