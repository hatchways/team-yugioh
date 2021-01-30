import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import axios from "axios";

import { useUserData, useSetUserData } from "../../providers/Context";
import IndividualAppointment from "./IndividualAppointment";
import { TrainRounded } from "@material-ui/icons";

const ScheduledAppointmentsTab = () => {
  const classes = useStyles();

  const userData = useUserData();
  const { _id: userId } = userData;

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/api/all-appointments").then(({ data }) => {
      // data: [{_id, email, eventId, hostId, name, time, timezone, duration},...]
      setAppointments(data);
    });
  }, [userId]);
  return (
    <Grid container direction="column">
      {appointments.length !== 0 &&
        appointments.map((appointment) => {
          return (
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
          );
        })}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({}));

ScheduledAppointmentsTab.propTypes = {};

export default ScheduledAppointmentsTab;
