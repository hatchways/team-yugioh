import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles, NativeSelect } from "@material-ui/core";
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
  TextField
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EventGrid from "../UserEvents/EventGrid";
import Avatar from "@material-ui/core/Avatar";
import Checkmark from "../../assets/check.png";
import ChipInput from "material-ui-chip-input";

import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { debounce } from "../../utils/utils";
import axios from "axios";
import { useUserData } from "../../providers/Context";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  dialog: {
    overflowX: "hidden"
  },
  profileAndNewTypeBox: {
    marginBottom: theme.spacing(5)
  },
  avatar: {
    marginRight: theme.spacing(2),
    background: theme.palette.secondary.main
  },
  name: {
    fontWeight: 500
  },
  userUrl: {
    color: "gray"
  },
  newEventTypeButton: {
    padding: ".5rem 2rem",
    textTransform: "none",
    marginBotton: theme.spacing(4)
  },
  cancel: {
    margin: theme.spacing(3, 0, 2),
    fontSize: ".8rem",
    color: "#9e9e9e"
  },
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)"
  },
  button: {
    background: theme.palette.primary.button,
    fontSize: ".8rem",
    color: "white",
    padding: "2% 5%",
    margin: "5% -2% 2% 0"
  },
  box: {
    padding: "0 3%"
  },
  inputRow: {
    marginBottom: ".9rem"
  },
  colorRow: {
    marginTop: "6%"
  },
  formLabel: {
    margin: "7% 4% 4% 3%",
    textAlign: "left"
  },
  descriptionLabel: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)"
  },
  paperWidthXl: {
    width: 550
  },
  prefix: {
    fontSize: ".75rem",
    fontWeight: "600",
    color: "lightgrey",
    borderRight: "1px solid lightgrey",
    textAlign: "center"
  },
  link: {
    "& > * > * > input": {
      padding: "0"
    },
    "& > * > * > fieldset": {
      border: "none"
    }
  },
  singleInput: {
    border: "1px solid lightgray",
    padding: "7px 3%",
    borderRadius: "4px"
  },
  textArea: {
    "&::placeholder": {
      fontSize: ".8rem",
      fontWeight: "500",
      color: "lightgrey",
      fontFamily: "sans-serif"
    }
  },
  groupedInput: {
    border: "1px solid lightgray",
    borderRadius: "4px",
    width: "100%",
    margin: 0,
    "&:hover": {
      borderColor: "black"
    },
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      "& > *": {
        margin: "-1px 0"
      }
    }
  },
  color: {
    borderRadius: "50%",
    border: "1px solid #d3d3d345",
    width: "1rem",
    height: "1rem"
  },
  colorButton: {
    textIndent: "-9999px",
    backgroundColor: "transparent",
    border: "none"
  },
  purple: {
    backgroundColor: "#7900FF"
  },
  orange: {
    backgroundColor: "#FF6A00"
  },
  green: {
    backgroundColor: "#66CC33"
  },
  blue: {
    backgroundColor: "#00AAFF"
  },
  yellow: {
    backgroundColor: "#FFFF00"
  },
  grey: {
    backgroundColor: "#808080"
  },
  endAdornment: {
    marginRight: -22
  },
  validIcon: {
    color: "green",
    fontSize: 16
  },
  invalidIcon: {
    color: "red",
    fontSize: 16
  },
  borderRed: {
    border: "2px solid red !important"
  },
  "@global": {
    ".MuiFormControl-marginNormal": {
      marginTop: "8px"
    },
    "div[class*='PrivateRadioButtonIcon'] svg": {
      opacity: 0
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
      filter: `drop-shadow(1px 1px 1px #80808050)`
    },
    "#linkGroup": {
      padding: "6.84px 4px"
    },
    "#durationGroup": {
      padding: "3.01px 0"
    }
  }
}));

function Modal(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, userName } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const [unit, setUnit] = useState("min");

  const handleUnitChange = event => {
    setUnit(event.target.value);
  };

  const [unique, setUnique] = useState(true);
  const [userURL, setUserURL] = useState();

  const [eventBody, setEventBody] = useState({
    name: "",
    duration: "",
    description: "",
    link: "",
    color: "#FF6A00"
  });

  const handleSubmit = () => {
    //api call here
    handleClose();
  };

  const checkUnique = async event => {
    try {
      const response = await axios.get(
        `/api/event/is_unique?URL=${event.target.value}`,
        {
          withCredentials: true
        }
      );
      if (response.status === 200);
      setUnique(true);
    } catch (err) {
      console.log(err);
      setUnique(false);
    }
  };

  const debounceCheckUnique = useCallback(debounce(checkUnique, 500), []);

  const handleLinkChange = async event => {
    handleFormChange(event);
    debounceCheckUnique(event);
  };

  const [invitees, setInvitees] = React.useState([
  ]);

  const handleDeleteChip = (chipToDelete)=> {
    setInvitees(invitees.filter((chip) => chip !== chipToDelete));
  };

  const handleAddChip=(chipToAdd)=>{
    setInvitees([...invitees, chipToAdd])
  }

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
        link: `${userURL}/${eventBody.link}`
      })
      .then(res => {
        const currentEventTypes = [...userEvents];
        currentEventTypes.push(res.data);
        setUserEvents(currentEventTypes);
        setEventBody({
          name: "",
          duration: "",
          description: "",
          link: "",
          color: "#FF6A00"
        });
      })
      .catch(err => console.log(err));
  }

  const handleFormChange = event => {
    const { name, value } = event.target;
    setEventBody({ ...eventBody, [name]: value });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="New team event dialog"
      open={open}
      maxWidth="xl"
      classes={{ paperWidthXl: classes.paperWidthXl }}
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
            <Grid xs={2} item>
              <InputLabel className={classes.label}>Name</InputLabel>
            </Grid>

            <Grid xs={10} item>
              <TextField
                variant="outlined"
                margin="normal"
                name="name"
                type="text"
                onChange={handleFormChange}
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
            <Grid xs={2} item>
              <InputLabel className={classes.label}>Duration</InputLabel>
            </Grid>

            <Grid xs={6} item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                wrap="nowrap"
                spacing={2}
                className={classes.groupedInput}
                id="durationGroup"
              >
                <Grid xs={4} item>
                  <Input
                    label="Duration"
                    name="duration"
                    type="number"
                    value={eventBody.duration}
                    onChange={handleFormChange}
                    disableUnderline
                    inputProps={{
                      min: "1",
                      style: { textAlign: "center" }
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid xs={8} item>
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
            <Grid xs={2} item>
              <InputLabel className={classes.descriptionLabel}>
                Desciption
              </InputLabel>
            </Grid>

            <Grid xs={10} item>
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
            <Grid xs={2} item>
              <InputLabel className={classes.label}>Link</InputLabel>
            </Grid>

            <Grid xs={10} item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                spacing={2}
                wrap="nowrap"
                id="linkGroup"
                className={
                  !unique && eventBody.link.length > 0
                    ? `${classes.groupedInput} ${classes.borderRed}`
                    : classes.groupedInput
                }
              >
                {/* TODO: pass in user link prefix */}
                <Grid xs={5} className={classes.prefix} item>
                  calendapp.com/john-doe/
                </Grid>
                <Grid className={classes.link} xs={7} item>
                  <TextField
                    name="link"
                    variant="outlined"
                    value={eventBody.link}
                    type="text"
                    onChange={handleLinkChange}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          classes={{ positionStart: classes.endAdornment }}
                        >
                          {eventBody.link.length > 0 ? (
                            unique ? (
                              <DoneIcon className={classes.validIcon} />
                            ) : (
                              <ClearIcon className={classes.invalidIcon} />
                            )
                          ) : null}
                        </InputAdornment>
                      )
                    }}
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
            <Grid xs={2} item>
              <InputLabel className={classes.label}>Invited</InputLabel>
            </Grid>

            <Grid xs={10} item>
              <ChipInput
                value={invitees}
                onAdd={chip => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
              />
            </Grid>
          </Grid>
          <Grid
            direction="row"
            alignItems="center"
            container
            justify="flex-start"
            className={classes.colorRow}
          >
            <Grid xs={2} item>
              <InputLabel className={classes.label}>Color</InputLabel>
            </Grid>

            <Grid xs={10} item>
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
                  spacing={2}
                >
                  {[
                    { name: "purple", hex: "#7900FF" },
                    { name: "blue", hex: "#00AAFF" },
                    { name: "green", hex: "#66CC33" },
                    { name: "yellow", hex: "#FFFF00" },
                    { name: "orange", hex: "#FF6A00" },
                    { name: "grey", hex: "#808080" }
                  ].map(color => (
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
              onClick={handleSubmit}
              color="primary"
              className={classes.button}
            >
              Create New Team Event
            </Button>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function NewTeEvantDialog({ userName }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.newEventTypeButton}
        color="secondary"
        variant="outlined"
        onClick={handleClickOpen}
      >
        + New Event Type
      </Button>
      <Modal open={open} onClose={handleClose} userName={userName} />
    </div>
  );
}
