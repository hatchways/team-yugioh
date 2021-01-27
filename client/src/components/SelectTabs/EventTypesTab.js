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
  Box,
  RadioGroup,
  Radio,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EventGrid from "../UserEvents/EventGrid";
import Avatar from "@material-ui/core/Avatar";
import Checkmark from "../../assets/check.png";

import { useUserData } from "../../providers/Context";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  dialog: {
    overflowX: "hidden",
  },
  profileAndNewTypeBox: {
    marginBottom: theme.spacing(5),
  },
  avatar: {
    marginRight: theme.spacing(2),
    background: theme.palette.secondary.main,
  },
  name: {
    fontWeight: 500,
  },
  userUrl: {
    color: "gray",
  },
  newEventTypeButton: {
    padding: ".5rem 2rem",
    textTransform: "none",
    marginBotton: theme.spacing(4),
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
    marginBottom: ".9rem",
  },
  colorRow: {
    marginTop: "6%",
  },
  formLabel: {
    margin: "7% 4% 4% 3%",
    textAlign: "left",
  },
  descriptionLabel: {
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
  },
  link: {
    "& > * > * > input": {
      padding: "0",
    },
    "& > * > * > fieldset": {
      border: "none",
    },
  },
  singleInput: {
    border: "1px solid lightgray",
    padding: "7px 3%",
    borderRadius: "4px",
  },
  textArea: {
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
    "&:hover": {
      borderColor: "black",
    },
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      "& > *": {
        margin: "-1px 0",
      },
    },
  },
  color: {
    borderRadius: "50%",
    border: "1px solid #d3d3d345",
    width: "1rem",
    height: "1rem",
  },
  colorButton: {
    textIndent: "-9999px",
    backgroundColor: "transparent",
    border: "none",
  },
  purple: {
    backgroundColor: "#7900FF",
  },
  orange: {
    backgroundColor: "#FF6A00",
  },
  green: {
    backgroundColor: "#66CC33",
  },
  blue: {
    backgroundColor: "#00AAFF",
  },
  yellow: {
    backgroundColor: "#FFFF00",
  },
  grey: {
    backgroundColor: "#808080",
  },
  "@global": {
    ".MuiFormControl-marginNormal": {
      marginTop: "8px",
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
    "#linkGroup": {
      padding: "6.84px 4px",
    },
    "#durationGroup": {
      padding: "3.01px 0",
    },
  },
}));

export default function EventTypesTab() {
  const classes = useStyles();
  const [userEvents, setUserEvents] = useState([]);
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [userURL, setUserURL] = useState();

  const [eventBody, setEventBody] = useState({
    name: "",
    duration: "",
    description: "",
    link: "",
    color: "#FF6A00",
  });
  const [unit, setUnit] = useState("min");

  const { name, photoUrl } = useUserData();

  useEffect(() => {
    axios
      .get("/api/event")
      .then((res) => {
        setUserEvents([...res.data]);
      })
      .catch((err) => console.log(err));
    axios
      .get("/api/user/get_url")
      .then((res) => {
        setUserURL(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setOpenNewEvent(true);
  };
  const handleClose = () => {
    setOpenNewEvent(false);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEventBody({ ...eventBody, [name]: value });
  };

  function createNewEventType() {
    handleClose();

    // TODO: make card titles change to xx hours xx mins for time > 60?
    let minutes;
    if (unit === "hour") {
      minutes = Math.floor(eventBody.duration * 60);
    } else {
      minutes = Math.floor(eventBody.duration);
    }
    setUnit("min");

    axios
      .post("/api/event", {
        ...eventBody,
        duration: minutes,
        link: `${userURL}/${eventBody.link}`,
      })
      .then((res) => {
        const currentEventTypes = [...userEvents];
        currentEventTypes.push(res.data);
        setUserEvents(currentEventTypes);
        setEventBody({
          name: "",
          duration: "",
          description: "",
          link: "",
          color: "#FF6A00",
        });
      })
      .catch((err) => console.log(err));
  }

  /* USER PROFILE + NEW EVENT TYPE BTN */
  return (
    <>
      <Container>
        <Grid container direction="row" justify="space-between">
          <Box display="flex" className={classes.profileAndNewTypeBox}>
            <Avatar
              className={classes.avatar}
              src={photoUrl}
              alt="User image"
            />
            <Box>
              <Typography className={classes.name}>{name}</Typography>
              <Typography className={classes.userUrl}>
                calendapp.com/john-doe
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              className={classes.newEventTypeButton}
              color="secondary"
              variant="outlined"
              onClick={handleClickOpen}
            >
              + New Event Type
            </Button>
          </Box>
        </Grid>
        {/* TYPE OF EVENT CARDS */}
        <EventGrid userEvents={userEvents} />
      </Container>
      <Dialog
        open={openNewEvent}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={classes.dialog}
        fullWidth
        maxWidth="sm"
      >
        <Box className={classes.box}>
          <Typography className={classes.formLabel} variant="h5">
            What event is this?
          </Typography>
          <DialogContent>
            <Grid
              direction="row"
              alignItems="center"
              container
              justify="flex-start"
              className={classes.inputRow}
            >
              <Grid xs="2" item>
                <InputLabel className={classes.label}>Name</InputLabel>
              </Grid>

              <Grid xs="10" item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  disableUnderline
                  fullWidth
                  value={eventBody.name}
                />
              </Grid>
            </Grid>
            <Grid
              direction="row"
              alignItems="center"
              container
              justify="flex-start"
              className={classes.inputRow}
            >
              <Grid xs="2" item>
                <InputLabel className={classes.label}>Duration</InputLabel>
              </Grid>

              <Grid xs="6" item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                  wrap="nowrap"
                  spacing="2"
                  className={classes.groupedInput}
                  id="durationGroup"
                >
                  <Grid xs="4" item>
                    <Input
                      label="Duration"
                      name="duration"
                      type="number"
                      value={eventBody.duration}
                      onChange={handleFormChange}
                      disableUnderline
                      inputProps={{
                        min: "1",
                        style: { textAlign: "center" },
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs="8" item>
                    <Select
                      value={unit}
                      onChange={handleUnitChange}
                      label="Units"
                      disableUnderline
                      fullWidth
                    >
                      <MenuItem value={"min"}>minutes</MenuItem>
                      <MenuItem value={"hour"}>hours</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              direction="row"
              alignItems="center"
              container
              justify="flex-start"
              className={classes.inputRow}
            >
              <Grid xs="2" item>
                <InputLabel className={classes.descriptionLabel}>
                  Desciption
                </InputLabel>
              </Grid>

              <Grid xs="10" item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="description"
                  multiline
                  onChange={handleFormChange}
                  fullWidth
                  value={eventBody.description}
                  placeholder={`Write a summary and details about your event.
                                    
                                    
                                    `}
                  className={classes.textArea}
                />
              </Grid>
            </Grid>
            <Grid
              direction="row"
              alignItems="center"
              container
              justify="flex-start"
              className={classes.inputRow}
            >
              <Grid xs="2" item>
                <InputLabel className={classes.label}>Link</InputLabel>
              </Grid>

              <Grid xs="10" item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                  spacing="2"
                  wrap="nowrap"
                  id="linkGroup"
                  className={classes.groupedInput}
                >
                  {/* TODO: pass in user link prefix */}
                  <Grid xs="5" className={classes.prefix} item>
                    calendapp.com/john-doe/
                  </Grid>
                  <Grid className={classes.link} xs="7" item>
                    <TextField
                      name="link"
                      variant="outlined"
                      value={eventBody.link}
                      type="text"
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              direction="row"
              alignItems="center"
              container
              justify="flex-start"
              className={classes.colorRow}
            >
              <Grid xs="2" item>
                <InputLabel className={classes.label}>Color</InputLabel>
              </Grid>

              <Grid xs="10" item>
                <RadioGroup
                  aria-label="color"
                  name="color"
                  onChange={handleFormChange}
                  value={eventBody.color}
                >
                  <Grid
                    direction="row"
                    alignItems="baseline"
                    container
                    justify="flex-start"
                    spacing="2"
                  >
                    {[
                      { name: "purple", hex: "#7900FF" },
                      { name: "blue", hex: "#00AAFF" },
                      { name: "green", hex: "#66CC33" },
                      { name: "yellow", hex: "#FFFF00" },
                      { name: "orange", hex: "#FF6A00" },
                      { name: "grey", hex: "#808080" },
                    ].map((color) => (
                      <Grid key={color.name} item>
                        <Radio
                          value={color.hex}
                          className={`${classes.color} ${classes[color.name]}`}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container alignItems="baseline" justify="flex-end">
              <Button
                onClick={handleClose}
                color="primary"
                className={classes.cancel}
              >
                Cancel
              </Button>
              <Button
                onClick={createNewEventType}
                color="primary"
                className={classes.button}
              >
                Create New Event Type
              </Button>
            </Grid>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
