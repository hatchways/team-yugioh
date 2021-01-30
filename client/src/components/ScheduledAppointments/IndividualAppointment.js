import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { parseISO, format } from "date-fns";

const IndividualAppointment = ({
  upcoming,
  attendeeName,
  attendeeEmail,
  attendeeTimezone,
  time,
  duration,
}) => {
  const classes = useStyles();
  const parsedDateObj = parseISO(time);
  const formattedTime = format(parsedDateObj, "h:mm b");
  const formattedDate = format(parsedDateObj, "E, LLL do yyyy");
  return (
    <div>
      {/*wrapping in a div so there is space between each appointment*/}
      <Accordion
        TransitionProps={{
          timeout: 0, //allows animation to look smoother
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography variant="body1">{formattedTime}</Typography>
              <Typography variant="body1">{formattedDate}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1">{attendeeName}</Typography>
              <Typography variant="body1">Event type {duration}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={8} container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="body1">Email: {attendeeEmail}</Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  Attendee timezone: {attendeeTimezone}
                </Typography>
              </Grid>
            </Grid>
            {upcoming && ( //render the reschedule and cancel button if the appointment is coming up
              <>
                <Divider orientation="vertical" flexItem={true} />
                <Grid
                  item
                  xs={4}
                  container
                  direction="column"
                  alignItems="flex-end"
                  spacing={3}
                >
                  <Grid item>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="secondary"
                    >
                      Reschedule
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    width: theme.spacing(15),
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
