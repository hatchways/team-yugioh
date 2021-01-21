const jwt = require("jwt-decode");

function getTokenBody(token) {
  console.log("decoding...");
  return jwt(token);
}

module.exports = getTokenBody;
