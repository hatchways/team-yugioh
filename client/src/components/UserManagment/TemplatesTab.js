import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EventSummaryDisplay from "./EventSummaryDisplay";

const useStyles = makeStyles({
  root: {
    marginTop: "4vh"
  },
  text: {
    fontSize: 16,
    fontWeight: "lighter"
  },
  headerText: {
    fontWeight: "normal",
    fontSize: 18
  },
  newUbutton: {
    padding: "6px 12px",
    fontSize: 14,
    fontWeight: "normal"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  eventContainer:{
    marginTop:20
}
});

export default function TemplateTabs() {
  const classes = useStyles();

  const dummyEventTypes = [
    {
      title: "Test1",
      duration: "60 min",
      link: "taras-k/test",
      eventColor: "red"
    },
    {
      title: "Test2",
      duration: "30 min",
      link: "taras-k/test2",
      eventColor: "blue"
    },
    {
      title: "Test3",
      duration: "15 min",
      link: "taras-k/test3",
      eventColor: "green"
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.text}>
        You can create event type templates and assign them to new users to help
        them get started. How to use this feature:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" className={classes.text}>
            Create as many templates as you'd like.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" className={classes.text}>
            As you add users, you'll be able to pick which event type templates
            they start with.
          </Typography>
        </li>
      </ul>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.headerText}>
          Event Type Templates
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.newUbutton}
          color="primary"
        >
          New Template
        </Button>
      </div>
      <div className={classes.eventContainer}>
        {dummyEventTypes.map((item, idx) => (
          <EventSummaryDisplay
            title={item.title}
            duration={item.duration}
            link={item.link}
            eventColor={item.eventColor}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
