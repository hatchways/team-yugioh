const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.AUTH_CREDENTIALS,
  process.env.AUTH_SECRET,
  process.env.AUTH_REDIRECT_PATH
);

//                     yyyy mm dd
//day in the format of 2021-01-19
async function getAvailability (auth_token, day){
    const myTimeMax=day+"T00:00:00.000Z";
    const myTimeMin=day+"T23:59:59.000Z";
    const auth=oAuth2Client.setCredentials(auth_token);
    const calendar=google.calendar({version:'v3', auth});
    const availability= await calendar.freebusy.query({
        requestBody:{
            "timeMax":myTimeMax,
            "timeMin":myTimeMin
        }
    })

    return availability;

}