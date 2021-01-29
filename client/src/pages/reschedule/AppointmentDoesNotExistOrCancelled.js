import React from "react";
import { Paper, makeStyles, Grid, Typography } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutline } from "@material-ui/icons";

const AppointmentDoesNotExistOrCancelled = ({ variant }) => {
  const appointmentCancelled = variant === "cancelled";
  const appointmentDoesNotExist = variant === "doesNotExist";

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <div className={classes.gridContainer}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            {appointmentCancelled && (
              <CheckCircleOutline className={classes.checkCircle} />
            )}
            {appointmentDoesNotExist && (
              <ErrorOutline className={classes.errorCircle} />
            )}
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {appointmentCancelled && "The appointment has been cancelled"}
              {appointmentDoesNotExist && "The appointment does not exist"}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(60),
    width: theme.spacing(100),
    margin: `${theme.spacing(10)}px auto`,
  },
  gridContainer: {
    padding: "3em",
  },
  checkCircle: {
    color: "green",
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
  errorCircle: {
    color: "red",
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
}));

export default AppointmentDoesNotExistOrCancelled;
