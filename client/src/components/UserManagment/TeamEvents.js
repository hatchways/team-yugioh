import React, {useState, useEffect} from "react";
import { Typography, Button, makeStyles, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EventSummaryDisplay from "./EventSummaryDisplay";
import EventCard from "../UserEvents/EventCard";
import NewTeamEventsDialog from "./NewTeamEventDialog";
import axios from "axios";
import { useUserData } from "../../providers/Context";

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
  const userData = useUserData();
  const [eventsData, setEventsData] = useState({});
  //console.log(userData)

  useEffect(() => {
    axios
      .get(`api/team-event/${userData._id}`)
      .then(res => {
        setEventsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
        {eventsData.map((item, idx) => (
          <Grid item xs={12} sm={3}>
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
