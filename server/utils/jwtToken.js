const jwt = require("jwt-decode");

function getTokenBody(token) {
  return jwt(token);
}

module.exports = getTokenBody;
