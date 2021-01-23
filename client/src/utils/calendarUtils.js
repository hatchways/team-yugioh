import moment from "moment";


export const getTimeSlots=(freeTimeInterval, meetingLength)=>{
    const timeSlots=freeTimeInterval
        const result=timeSlots.map(item=>breakUpTimes(item,meetingLength))
        console.log("result",result)
        return result.flat();

}

const milliscondsToMinutes=(milliseconds)=>{
    return Math.floor(milliseconds/60000);
}

const breakUpTimes=(timeslot,meetingLength)=>{
    const intervals=[];
    const startTime=timeslot.start;
    const endTime=moment(timeslot.end)
    const meetingEndTime=moment(startTime);

    const intervalLength=(meetingLength*-1)
    console.log("local start:",meetingEndTime.toString())
    console.log("local end:",endTime.toString())
    while(milliscondsToMinutes(meetingEndTime.diff(endTime))<=intervalLength){
      console.log("diff:", milliscondsToMinutes(meetingEndTime.diff(endTime)))
        
        const meetingStartHour=meetingEndTime.get("hours");
        const meetingStartMinute=meetingEndTime.get("minutes");
        const minutesFormated=meetingStartMinute<10?"0"+meetingStartMinute:meetingStartMinute+""
        intervals.push(`${meetingStartHour}:${minutesFormated}`)
        meetingEndTime.add(meetingLength,"minutes");
        console.log(meetingEndTime.toString())
        
    }
    console.log("end=======>")
    return intervals;
   
}