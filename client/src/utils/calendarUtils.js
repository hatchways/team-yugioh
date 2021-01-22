import moment from "moment";
export const getTimeSlots=(freeTimeInterval, meetingLength)=>{
    const timeSlots=freeTimeInterval
        timeSlots.map(item=>breakUpTimes(item,meetingLength))

        console.log(timeSlots);
       

}


const breakUpTimes=(timeslot,meetingLength)=>{
    const intervals=[];
    const startTime=timeslot.start;
    const endTime=moment(timeslot.end)
    const meetingEndTime=moment(startTime);
    const intervalLength=(meetingLength*-1)

    while(meetingEndTime.diff(endTime)<=intervalLength){
        const meetingStartHour=meetingEndTime.get("hours");
        const meetingStartMinute=meetingEndTime.get("minutes");
        meetingEndTime.add(meetingLength,"minutes");
        intervals.push(`${meetingStartHour}:${meetingStartMinute}`)
        
    }

    return intervals;
   
}