import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { parseISO, format } from "date-fns";
import axios from "axios";

const IndividualAppointment = ({
  upcoming,
  attendeeName,
  attendeeEmail,
  attendeeTimezone,
  time,
  eventId,
}) => {
  const parsedDateObj = parseISO(time);
  const formattedTime = format(parsedDateObj, "h:mm b");
  const formattedDate = format(parsedDateObj, "E, LLL do yyyy");

  const [eventDetails, setEventDetails] = useState({});
  const classes = useStyles({ eventColor: eventDetails.eventColor, upcoming });
  useEffect(() => {
    axios.get(`/api/event-details-via-id/${eventId}`).then(({ data }) => {
      //data: {userId, duration, name, description, color, link, members}
      setEventDetails({
        eventName: data.name,
        eventDescription: data.description,
        eventColor: data.color,
        duration: data.duration,
      });
    });
  }, [eventId]);

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.colorBar} />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4" className={classes.textDisplayingDateTime}>
              {formattedTime} ({eventDetails.duration} min)
            </Typography>
            <Typography variant="h6" className={classes.textDisplayingDateTime}>
              {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Attendee: {attendeeName}</Typography>
            <Typography variant="body1">
              Event name: {eventDetails.eventName}
            </Typography>
            <Typography variant="body1">
              Attendee email: {attendeeEmail}
            </Typography>
            <Typography variant="body1">
              Attendee timezone: {attendeeTimezone}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  button: {
    width: theme.spacing(15),
  },
  colorBar: {
    background: (props) => props.eventColor,
  },
  textDisplayingDateTime: {
    color: (props) => !props.upcoming && "lightgrey", // grey out the time if appointment is in the past
  },
}));

IndividualAppointment.propTypes = {
  upcoming: PropTypes.bool,
  attendeeName: PropTypes.string,
  attendeeEmail: PropTypes.string,
  attendeeTimezone: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.number,
};

export default IndividualAppointment;
