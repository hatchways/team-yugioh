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

const RescheduleCancel = ({ reschedule, appointmentId, eventUrl }) => {
  const classes = useStyles();
  const cancelAppointment = (event) => {
    axios.delete(`/api/appointment/cancel/${appointmentId}`);
  };

  const linkToReschedule = `/schedule-meeting/${eventUrl}`;
  const linkToSuccessfulCancellation = "/successful-cancellation";
  return (
    <div className={classes.gridContainer}>
      <Grid container direction="column" spacing={reschedule ? 1 : 4}>
        <Grid item>
          <Typography variant="h5">
            Cancel appointment {reschedule && " and reschedule?"}
          </Typography>
        </Grid>
        <Grid item>
          {!reschedule && (
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
