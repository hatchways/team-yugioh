import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import BackArrow from "../../assets/back.svg";

const Confirmation = () => {
  const classes = useStyles();

  return <>Appointment made!</>;
};

const useStyles = makeStyles((theme) => ({
  root: { height: "100%", overflow: "hidden" },
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
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "30%",
    minWidth: "0",
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
