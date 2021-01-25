import moment from "moment";

export const getTimeSlots = (freeTimeInterval, meetingLength) => {
  const timeSlots = freeTimeInterval;
  const result = timeSlots.map(item => breakUpTimes(item, meetingLength));
  return result.flat();
};

const milliscondsToMinutes = milliseconds => {
  return Math.floor(milliseconds / 60000);
};

const breakUpTimes = (timeslot, meetingLength) => {
  const intervals = [];
  const startTime = timeslot.start;
  const endTime = moment(timeslot.end);
  const meetingEndTime = moment(startTime);

  const intervalLength = meetingLength * -1;

  while (milliscondsToMinutes(meetingEndTime.diff(endTime)) <= intervalLength) {
    const meetingStartHour = meetingEndTime.get("hours");
    const meetingStartMinute = meetingEndTime.get("minutes");
    const minutesFormated =
      meetingStartMinute < 10
        ? "0" + meetingStartMinute
        : meetingStartMinute + "";
    intervals.push(`${meetingStartHour}:${minutesFormated}`);
    meetingEndTime.add(meetingLength, "minutes");
  }
  return intervals;
};

export const getNextAvailableDate = (date, availDates) => {
  const dateMomement = moment(date);
  while (!availDates.includes(date.getDay())) {
    dateMomement.add(1, "day");
    date = dateMomement.toDate();
  }
  return dateMomement.toDate();
};
