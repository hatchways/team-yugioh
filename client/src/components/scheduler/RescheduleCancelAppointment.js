import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";

const RescheduleCancelAppointment = ({
  variant,
  appointmentId,
  setAppointmentCancelled,
  setRedirectToScheduling,
}) => {
  const reschedule = variant === "reschedule";
  const cancel = variant === "cancel";
  const classes = useStyles();
  const cancelAppointmentThenReschedule = (event) => {
    axios.delete(`/api/appointment/cancel/${appointmentId}`).then(() => {
      if (reschedule) {
        setRedirectToScheduling(true);
      }

      if (cancel) {
        setAppointmentCancelled(true);
      }
    });
  };

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
          <Button
            className={classes.button}
            onClick={cancelAppointmentThenReschedule}
          >
            Confirm
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
export default RescheduleCancelAppointment;
