import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { parseISO, startOfToday, compareAsc } from "date-fns";

import { useUserData } from "../../providers/Context";
import IndividualAppointment from "./IndividualAppointment";
import YourAppointments from "./YourAppointments";

const ScheduledAppointmentsTab = () => {
  const userData = useUserData();
  const { _id: userId } = userData;

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    axios.get("/api/all-appointments").then(({ data }) => {
      // data: [{_id, email, eventId, hostId, name, time, timezone, duration},...]

      const upcomingAppointments = [];
      const pastAppointments = [];

      data.forEach((appointment) => {
        if (appointmentIsUpcoming(appointment.time)) {
          upcomingAppointments.push(appointment);
        } else {
          pastAppointments.push(appointment);
        }
      });

      setUpcomingAppointments(upcomingAppointments);
      setPastAppointments(pastAppointments);
    });
  }, [userId]);
  return (
    <Grid container direction="column">
      <YourAppointments
        upcoming={true}
        empty={upcomingAppointments.length === 0}
      />

      {upcomingAppointments.length !== 0 &&
        upcomingAppointments.map((appointment) => (
          <IndividualAppointment
            key={appointment._id}
            appointmentId={appointment._id} //this is for child access
            upcoming={true}
            attendeeName={appointment.name}
            time={appointment.time}
            duration={appointment.duration}
            attendeeEmail={appointment.email}
            attendeeTimezone={appointment.timezone}
          />
        ))}

      <YourAppointments
        upcoming={false}
        empty={pastAppointments.length === 0}
      />

      {pastAppointments.length !== 0 &&
        pastAppointments.map((appointment) => (
          <IndividualAppointment
            key={appointment._id}
            appointmentId={appointment._id} //this is for child access
            upcoming={false}
            attendeeName={appointment.name}
            time={appointment.time}
            duration={appointment.duration}
            attendeeEmail={appointment.email}
            attendeeTimezone={appointment.timezone}
          />
        ))}
    </Grid>
  );
};

const appointmentIsUpcoming = (appointmentDateInISOString) => {
  // upcoming === true indicate that the appointment is either today or tomorrow onward
  const today = startOfToday();
  const appointmentDate = parseISO(appointmentDateInISOString);

  // comparison value:
  // 1 if appointment is upcoming
  // -1 if appointment is in the past
  // 0 if the appointment is today
  const comparison = compareAsc(appointmentDate, today);
  if (comparison === -1) {
    return false;
  } else {
    return true;
  }
};

export default ScheduledAppointmentsTab;
