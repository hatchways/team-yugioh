const { google } = require("googleapis");
const moment = require("moment");

//                     yyyy mm dd
//day in the format of 2021-01-19
async function getAvailability(auth_token, day) {
  const client = authorize(auth_token);
  const bussy = await listEvents(client);
  console.log(bussy.data);
}

function authorize(token) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.AUTH_CREDENTIALS,
    process.env.AUTH_SECRET,
    process.env.AUTH_REDIRECT_PATH
  );

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  const today = moment().utc();
  const todayIso = today.toISOString();
  console.log(todayIso);
  const tommorrow = moment.utc().add(1, "days");

  const tommorrowIso = tommorrow.toISOString();
  const bussy = await calendar.freebusy.query({
    requestBody: {
      timeMin: todayIso,
      timeMax: tommorrowIso,
      items: [
        {
          id: "primary"
        }
      ]
    }
  });

  return bussy;
}

module.exports = getAvailability;
