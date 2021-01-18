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
    dialog: {
        overflowX: "hidden",
        backgroundColor: "red",
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
        color: "lightgrey",
    },
    label: {
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "rgba(0, 0, 0, 0.8)",
    },
    button: {
        background: theme.palette.primary.button,
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

export default function EventTypesTab() {
    const classes = useStyles();
    const [userEvents, setUserEvents] = useState([15, 30, 60]);
    const [openNewEvent, setOpenNewEvent] = useState(false);
    const [eventBody, setEventBody] = useState({
        name: "",
        duration: "",
        description: "",
        link: "",
        color: "orange",
    });
    const [unit, setUnit] = useState("min");
    const [duration, setDuration] = useState();
    const colors = ["purple", "blue", "green", "yellow", "orange", "grey"];

    // replace with actual user id
    const userId = "5ffe8c395a611a0000d0c692";

    useEffect(() => {
        axios
            .get("/api/event?user_id=" + userId)
            .then((res) => {
                const oldEventTypes = res.data.map(({ duration }) => duration);
                setUserEvents([...userEvents, ...oldEventTypes]);
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
    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEventBody({ ...eventBody, [name]: value });
    };

    function createNewEventType() {
        handleClose();

        // TODO: make card titles change to xx hours xx mins for time > 60?

        let time;
        if (unit === "hour") {
            time = Math.floor(duration * 60);
        } else {
            time = Math.floor(duration);
        }

        axios
            .post("/api/event", {
                user_id: userId,
                duration: time,
            })
            .then((res) => {
                console.log(res);
                const currentEventTypes = [...userEvents];
                currentEventTypes.push(res.data.duration);
                setUserEvents(currentEventTypes);
                setDuration();
            })
            .catch((err) => console.log(err));
    }

    /* USER PROFILE + NEW EVENT TYPE BTN */
    return (
        <>
            <Container>
                <Grid container direction="row" justify="space-between">
                    <Box
                        item
                        display="flex"
                        className={classes.profileAndNewTypeBox}
                    >
                        <Avatar
                            className={classes.avatar}
                            src={ProfileImage}
                            alt="User image"
                        />
                        <Box>
                            <Typography className={classes.name}>
                                John Doe
                            </Typography>
                            <Typography className={classes.userUrl}>
                                calendapp.com/john-doe
                            </Typography>
                        </Box>
                    </Box>
                    <Box item>
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
                                <InputLabel className={classes.label}>
                                    Name
                                </InputLabel>
                            </Grid>

                            <Grid xs="10" className={classes.singleInput} item>
                                <Input
                                    label="Name"
                                    name="name"
                                    type="text"
                                    onChange={handleFormChange}
                                    disableUnderline
                                    fullWidth
                                    value={eventBody.name || ""}
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
                                <InputLabel className={classes.label}>
                                    Duration
                                </InputLabel>
                            </Grid>

                            <Grid xs="6" item>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="baseline"
                                    justify="flex-start"
                                    wrap="nowrap"
                                    spacing="2"
                                    className={classes.groupedInput}
                                >
                                    <Grid xs="4" item>
                                        <Input
                                            label="Duration"
                                            name="duration"
                                            type="number"
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
                                            <MenuItem value={"min"}>
                                                minutes
                                            </MenuItem>
                                            <MenuItem value={"hour"}>
                                                hours
                                            </MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            direction="row"
                            alignItems="flex-start"
                            container
                            justify="flex-start"
                            className={classes.inputRow}
                        >
                            <Grid xs="2" item>
                                <InputLabel
                                    className={classes.descriptionLabel}
                                >
                                    Desciption
                                </InputLabel>
                            </Grid>

                            <Grid xs="10" className={classes.singleInput} item>
                                <TextareaAutosize
                                    rowsMax={6}
                                    name="description"
                                    onChange={handleFormChange}
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
                                <InputLabel className={classes.label}>
                                    Link
                                </InputLabel>
                            </Grid>

                            <Grid xs="10" item>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="baseline"
                                    justify="flex-start"
                                    spacing="2"
                                    wrap="nowrap"
                                    className={classes.groupedInput}
                                >
                                    {/* TODO: pass in user link prefix */}
                                    <Grid
                                        xs="5"
                                        className={classes.prefix}
                                        item
                                    >
                                        calendapp.com/john-doe/
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            label="Link"
                                            name="link"
                                            type="text"
                                            onChange={handleFormChange}
                                            disableUnderline
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
                                <InputLabel className={classes.label}>
                                    Color
                                </InputLabel>
                            </Grid>

                            <Grid xs="10" item>
                                <RadioGroup
                                    aria-label="color"
                                    name="color"
                                    onChange={handleFormChange}
                                    defaultValue="orange"
                                >
                                    <Grid
                                        direction="row"
                                        alignItems="baseline"
                                        container
                                        justify="flex-start"
                                        spacing="2"
                                    >
                                        {colors.map((color) => (
                                            <Grid item>
                                                <Radio
                                                    value={color}
                                                    className={`${classes.color} ${classes[color]}`}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            alignItems="baseline"
                            justify="flex-end"
                        >
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
