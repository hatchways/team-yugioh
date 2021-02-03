const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/calendar.readonly"
];

const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.AUTH_CREDENTIALS,
  process.env.AUTH_SECRET,
  process.env.AUTH_REDIRECT_PATH
);

//authorise google api
function authorize(token) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.AUTH_CREDENTIALS,
    process.env.AUTH_SECRET,
    process.env.AUTH_REDIRECT_PATH
  );

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

function generateAuthUrl() {
  const settings = {
    access_type: "offline",
    scope: SCOPES,
    prompt: "select_account"
  };

  if (process.env.FORCE_CONSENT == "true") {
    settings.prompt = "consent";
  }

  const authUrl = oAuth2Client.generateAuthUrl(settings);
  return authUrl;
}

function getAccessToken(code) {
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    return token;
  });
}

module.exports = { generateAuthUrl, getAccessToken, authorize };
