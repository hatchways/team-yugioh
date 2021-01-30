import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import axios from "axios";
import { parseISO, startOfToday, compareAsc } from "date-fns";

import { useUserData, useSetUserData } from "../../providers/Context";
import IndividualAppointment from "./IndividualAppointment";
import YouHaveNoAppointments from "./YouHaveNoAppointments";
import { FormatListBulletedSharp } from "@material-ui/icons";

const ScheduledAppointmentsTab = () => {
  const classes = useStyles();

  const userData = useUserData();
  const { _id: userId } = userData;

  const [upcomingAppointments, setupcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    axios.get("/api/all-appointments").then(({ data }) => {
      // data: [{_id, email, eventId, hostId, name, time, timezone, duration},...]
      const today = startOfToday();
      console.log("today", today);
      const upcomingAppointments = [];
      const pastAppointments = [];
      data.forEach((appointment) => {
        const appointmentDate = parseISO(appointment.time);

        // comparison value:
        // 1 if appointment is upcoming
        // -1 if appointment is in the past
        // 0 if the appointment is today
        const comparison = compareAsc(appointmentDate, today);

        if (comparison === -1) {
          pastAppointments.push(appointment);
        } else {
          upcomingAppointments.push(appointment);
        }
      });

      setupcomingAppointments(upcomingAppointments);
      setPastAppointments(pastAppointments);
    });
  }, [userId]);
  return (
    <Grid container direction="column">
      {upcomingAppointments.length === 0 && (
        <YouHaveNoAppointments upcoming={true} />
      )}

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

      <Divider />

      {pastAppointments.length === 0 && (
        <YouHaveNoAppointments upcoming={false} />
      )}

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

const useStyles = makeStyles((theme) => ({}));

ScheduledAppointmentsTab.propTypes = {};

export default ScheduledAppointmentsTab;
