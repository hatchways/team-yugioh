import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

import { useUserData, useSetUserData } from "../../providers/Context";

const ScheduledEventsTab = () => {
  const classes = useStyles();

  const userData = useUserData();
  const { _id: userId } = userData;

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/api/all-appointments").then(({ data }) => {
      // data: [{_id, email, eventId, hostId, name, time, timezone},...]
    });
  }, [userId]);
  return <div>hi</div>;
};

const useStyles = makeStyles((theme) => ({}));

ScheduledEventsTab.propTypes = {};

export default ScheduledEventsTab;
