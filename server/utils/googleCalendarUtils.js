const { google } = require("googleapis");
const moment = require("moment");

//                     yyyy mm dd
//day in the format of 2021-01-19
async function getAvailability(auth_token, day) {
  const client = authorize(auth_token);
  const bussy = await getBuyssy(client,day);
  console.log(bussy);
}

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

//return array of bussy times
//day=start of day Date() object
async function getBuyssy(auth, day) {
  const calendar = google.calendar({ version: "v3", auth });
  const startOfDay=(new Date(day)).toISOString();
  
  
  const endOfDayInter=new Date(day);
  endOfDayInter.setHours(23,59,59,999);
  const endOfDay=endOfDayInter.toISOString()
  
  const bussy = await calendar.freebusy.query({
    requestBody: {
      timeMin: startOfDay,
      timeMax: endOfDay,
      items: [
        {
          id: "primary"
        }
      ]
    }
  });

  return bussy.data.calendars.primary.busy;
}

function getFreeTimes(bussyTimes){
  
}

module.exports = getAvailability;
