import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

const RescheduleCancel = ({ variant, appointmentId, eventUrl }) => {
  const reschedule = variant === "reschedule";
  const cancel = variant === "cancel";
  const classes = useStyles();
  const cancelAppointment = (event) => {
    axios.delete(`/api/appointment/cancel/${appointmentId}`).then(() => {
      setAppointmentCancelled(true);
    });
  };

  const linkToReschedule = `/appt/${eventUrl}`;
  const linkToSuccessfulCancellation = "/appointment/cancelled";
  return (
    <div className={classes.gridContainer}>
      <Grid container direction="column" spacing={reschedule ? 1 : 4}>
        <Grid item>
          <Typography variant="h5">
            {reschedule && "Cancel appointment and reschedule?"}
            {cancel && "Cancel appointment?"}
          </Typography>
        </Grid>
        <Grid item>
          {cancel && (
            <TextField
              label="Reason for canceling"
              multiline
              rows={7}
              variant="outlined"
              fullWidth
            />
          )}
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={cancelAppointment}>
            <Link
              className={classes.link}
              to={reschedule ? linkToReschedule : linkToSuccessfulCancellation}
            >
              Confirm
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "2em",
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));
export default RescheduleCancel;
