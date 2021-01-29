import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function EventGrid({ userEvents }) {
  const classes = useStyles();
  const [userURL, setUserURL] = useState();

  useEffect(() => {
    axios.get("/api/user/get_url").then((res) => {
      setUserURL(res.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={10} justify="center">
        {userEvents.map((event, i) => (
          <Grid key={i} item>
            <EventCard {...event} url={userURL} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

EventGrid.PropTypes = {
  userEvents: PropTypes.array,
};
