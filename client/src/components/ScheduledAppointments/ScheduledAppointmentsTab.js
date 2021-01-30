import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

import { useUserData, useSetUserData } from "../../providers/Context";
import IndividualAppointment from "./IndividualAppointment";

const ScheduledAppointmentsTab = () => {
  const classes = useStyles();

  const userData = useUserData();
  const { _id: userId } = userData;

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/api/all-appointments").then(({ data }) => {
      // data: [{_id, email, eventId, hostId, name, time, timezone},...]
      setAppointments(data);
    });
  }, [userId]);
  return (
    <div>
      {appointments.length !== 0 &&
        appointments.map((appointment) => {
          return <IndividualAppointment key={appointment._id} />;
        })}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({}));

ScheduledAppointmentsTab.propTypes = {};

export default ScheduledAppointmentsTab;
