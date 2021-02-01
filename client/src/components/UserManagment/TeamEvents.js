import React from "react";
import { Typography, Button, makeStyles, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EventSummaryDisplay from "./EventSummaryDisplay";
import EventCard from "../UserEvents/EventCard";
import NewTeamEventsDialog from "./NewTeamEventDialog";

const useStyles = makeStyles({
  root: {
    marginTop: "4vh"
  },
  text: {
    fontSize: 16,
    fontWeight: "lighter",
    marginBottom: "3%"
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
  eventContainer: {
    marginTop: 20,
  }
});

export default function TeamEventsTab() {
  const classes = useStyles();

  const dummyEventTypes = [
    {
      name: "Test1",
      duration: "60",
      link: "taras-k/test",
      color: "red"
    },
    {
      name: "Test2",
      duration: "30",
      link: "taras-k/test2",
      color: "blue"
    },
    {
      name: "Test3",
      duration: "15",
      link: "taras-k/test3",
      color: "green"
    }
  ];

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.text}>
        You can create team event types and invite your teamates to participate.
      </Typography>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.headerText}>
          Team Events:
        </Typography>
        {/* <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.newUbutton}
          color="primary"
        >
          New Team Event
        </Button> */}
        <NewTeamEventsDialog/>
      </div>
      <Grid container spacing={3} className={classes.eventContainer}>
        {dummyEventTypes.map((item, idx) => (
          <Grid item xs={12} sm={4}>
            <EventCard
              name={item.name}
              duration={item.duration}
              link={item.link}
              color={item.color}
              key={idx}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}