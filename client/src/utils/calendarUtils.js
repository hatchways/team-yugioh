import moment from "moment";

export const getTimeSlots = (
  freeTimeInterval,
  meetingLength,
  availabilityTimes
) => {
  const timeSlots = freeTimeInterval;
  const result = timeSlots.map(item => breakUpTimes(item, meetingLength));
  
  //filter out unavailable times
  const filteredTimes = removeUnavailableTimes(
    result.flat(),
    availabilityTimes
  );
  return filteredTimes;
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

const removeUnavailableTimes = (timeArr, availabilityTimes) => {
  const lowerBoundTimeTotalMin = convertToMinutes(availabilityTimes.start);
  const uperBoundTimeTotalMin = convertToMinutes(availabilityTimes.end);

  return timeArr.filter(
    time =>
      convertToMinutes(time) >= lowerBoundTimeTotalMin &&
      convertToMinutes(time) <= uperBoundTimeTotalMin
  );
};

const convertToMinutes = time => {
  const timeArr = time.split(":");

  return parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
};
