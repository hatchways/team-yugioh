const { google } = require("googleapis");
const {authorize} =require("../utils/googleAuthUtils")
//                     yyyy mm dd
//day in the format of 2021-01-19
async function getAvailability(auth_token, day) {
  const client = authorize(auth_token);
  const bussy = await getBuyssy(client, day);
  const free = getFreeTimes(bussy, day);
 
  return free;
}


//returns array of bussy times
async function getBuyssy(auth, day) {
  const calendar = google.calendar({ version: "v3", auth });

  const startOfDay = new Date(day).toISOString();

  const endOfDayInter = new Date(day);
  endOfDayInter.setHours(23, 59, 59, 999);
  const endOfDay = endOfDayInter.toISOString();
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

function getFreeTimes(bussyTimes, day) {
  const freeTimes = [];
  const startOfDay = new Date(day);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(day);
  endOfDay.setHours(23, 59, 59, 999);

  //if no booked slots return whole day as free
  if (bussyTimes.length < 1) return [{ start: startOfDay.toISOString(), end: endOfDay.toISOString() }];

  //if the first meeting doesnt start at start of day add free interval between start of day and first meeting
  if (Date.parse(startOfDay) < Date.parse(bussyTimes[0].start))
    freeTimes.push({
      start: startOfDay.toISOString(),
      end: bussyTimes[0].start
    });

  //add free intervals between scheduled meetings
  for (let i = 0; i < bussyTimes.length - 1; i++) {
    if (bussyTimes[i].end < bussyTimes[i + 1].start)
      freeTimes.push({
        start: bussyTimes[i].end,
        end: bussyTimes[i + 1].start
      });
  }

  //if the last meeting doesnt end at end of day add
  if (Date.parse(endOfDay) > Date.parse(bussyTimes[bussyTimes.length - 1].end))
    freeTimes.push({
      start: bussyTimes[bussyTimes.length - 1].end,
      end: endOfDay.toISOString()
    });

  return freeTimes;
}

module.exports = getAvailability;
