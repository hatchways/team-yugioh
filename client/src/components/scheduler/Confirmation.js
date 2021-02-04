import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import BackArrow from "../../assets/back.svg";
import Yay from "../../assets/yay.png";

const Confirmation = ({ eventDetails, appointmentDetails }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      align="center"
      justify="center"
      spacing={2}
      container
      direction="column"
    >
      <Grid item>
        <Typography variant="h3" color="textSecondary">
          Confirmed
        </Typography>
      </Grid>
      <Grid item>
        <img
          src={Yay}
          alt="A happy, jumping calendar"
          className={classes.calendy}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" color="textSecondary">
          Thank you, {appointmentDetails.name}!
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h6">
          You are scheduled for{" "}
          {`${eventDetails.name}` ||
            `a ${eventDetails.duration} minute meeting`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          At {appointmentDetails.time.toString()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          An invitation has been sent to your email!
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "100%",
    overflow: "hidden",
    margin: "0 auto",
  },
  button: {
    background: theme.palette.primary.button,
    fontSize: ".8rem",
    color: "white",
    padding: "2% 5%",
    margin: "5% 0 0 17%",
    width: "33%",
  },
  back: {
    background: "white",
    fontSize: ".8rem",
    color: theme.palette.primary.main,
    textDecoration: "none",
    margin: "5% 0",
    padding: "0",
    width: "10%",
    height: "2.3rem",
    border: "1px solid lightgray",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
  },
  backButton: {
    width: "100%",
    height: "100%",
    textIndent: "-9999px",
    backgroundImage: `url(${BackArrow})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "30%",
    minWidth: "0",
  },
  calendy: {
    width: "50%",
  },
  formLabel: {
    margin: "0 6%",
    textAlign: "left",
  },
  inputRow: {
    marginBottom: ".5rem",
  },
}));

Confirmation.propTypes = {
  appointmentDetails: PropTypes.object,
  setAppointmentDetails: PropTypes.func,
};

export default Confirmation;
