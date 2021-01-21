import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Grid,
  Input,
  InputLabel,
  TextareaAutosize,
  Box,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EventGrid from "../UserEvents/EventGrid";
import Avatar from "@material-ui/core/Avatar";
import ProfileImage from "./../../img/user-image.png";
import Checkmark from "../../assets/check.png";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    fontWeight: 500,
  },
  userUrl: {
    color: "gray",
  },
  cancel: {
    margin: theme.spacing(3, 0, 2),
    fontSize: ".8rem",
    color: "#9e9e9e",
  },
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
  },
  button: {
    background: theme.palette.primary.button,
    fontSize: ".8rem",
    color: "white",
    padding: "2% 5%",
    margin: "5% -2% 2% 0",
  },
  box: {
    padding: "0 3%",
    width: "90%",
    minWidth: "90%",
    maxWidth: "90%",
    margin: "auto",
  },
  inputRow: {
    marginBottom: "4%",
  },
  colorRow: {
    marginTop: "6%",
  },
  formLabel: {
    margin: "7% 4% 4% 3%",
    textAlign: "left",
  },
  descriptionLabel: {
    marginTop: "13%",
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
  },
  prefix: {
    fontSize: ".75rem",
    fontWeight: "600",
    color: "lightgrey",
    borderRight: "1px solid lightgrey",
    textAlign: "center",
    marginLeft: "2%",
  },
  singleInput: {
    border: "1px solid lightgray",
    padding: "7px 3%",
    borderRadius: "4px",
  },
  textArea: {
    border: "none",
    width: "100%",
    maxWidth: "100%",
    minWidth: "100%",
    "&::placeholder": {
      fontSize: ".8rem",
      fontWeight: "500",
      color: "lightgrey",
      fontFamily: "sans-serif",
    },
  },
  groupedInput: {
    border: "1px solid lightgray",
    borderRadius: "4px",
    width: "100%",
    margin: 0,
  },
  "@global": {
    ".MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiDialog-paperFullWidth.MuiPaper-elevation24.MuiPaper-rounded": {
      overflowX: "hidden",
    },
    "div[class*='PrivateRadioButtonIcon'] svg": {
      opacity: 0,
    },
    "div[class*='PrivateRadioButtonIcon-checked-']:after": {
      content: "''",
      backgroundImage: `url("${Checkmark}")`,
      width: "1.5rem",
      height: "1.5rem",
      position: "absolute",
      top: "-1px",
      left: "-1px",
      backgroundSize: "contain",
      filter: `drop-shadow(1px 1px 1px #80808050)`,
    },
  },
}));

export default function ConfirmAppointment({
  name,
  email,
  event_id,
  addAppointment,
}) {
  const classes = useStyles();

  return (
    <button onClick={addAppointment} className={classes.button}>
      <Card className={classes.root}>
        <CardHeader className={classes.colorBar}></CardHeader>

        <CardContent>
          <Typography variant="h5">
            {name || duration + " minute meeting"}
          </Typography>

          <Typography variant="subtitle2" color="textSecondary">
            One-on-One
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography item variant="subtitle2">
              {duration} min
            </Typography>
            <Button
              item
              variant="outlined"
              color="secondary"
              size="small"
              style={{ textTransform: "none" }}
            >
              Copy Link
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </button>
  );
}
