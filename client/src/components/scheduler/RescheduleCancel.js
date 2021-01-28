import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const RescheduleCancel = ({ reschedule }) => {
  const classes = useStyles();
  const cancelEvent = (event) => {
    console.log("hi");
  };
  return (
    <div className={classes.gridContainer}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h5">
            Cancel event {reschedule && " and reschedule?"}
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
          <Button className={classes.button} onClick={cancelEvent}>
            {reschedule && (
              <Link className={classes.link} to="/schedule-meeting">
                Reschedule
              </Link>
            )}
            {!reschedule && "Cancel event"}
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
