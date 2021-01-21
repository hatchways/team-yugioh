const SCOPES = ["https://www.googleapis.com/auth/userinfo.email", "openid", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/calendar.readonly"];

const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.AUTH_CREDENTIALS,
  process.env.AUTH_SECRET,
  process.env.AUTH_REDIRECT_PATH
);



 function generateAuthUrl(){
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
      });
    return authUrl;
 }

function getAccessToken( code) {
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
       return token;
      });
}

module.exports={generateAuthUrl, getAccessToken};
