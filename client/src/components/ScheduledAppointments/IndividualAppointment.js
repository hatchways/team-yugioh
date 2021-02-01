import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
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
  const classes = useStyles({ eventColor: eventDetails.eventColor });
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
    <Card>
      <CardHeader className={classes.colorBar} />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4">
              {formattedTime} ({eventDetails.duration} min)
            </Typography>
            <Typography variant="h6">{formattedDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Appointment with: {attendeeName}
            </Typography>
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
  cardContent: {
    padding: theme.spacing(2),
  },
  button: {
    width: theme.spacing(15),
  },
  colorBar: {
    background: (props) => props.eventColor,
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
