// rfc snippet

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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

  return (
    <div className={classes.root}>
      <Grid container spacing={10} justify="center">
        {userEvents.map((event, i) => (
          <Grid key={i} item>
            <EventCard {...event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
