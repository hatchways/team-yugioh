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
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EventGrid from "../UserEvents/EventGrid";
import Avatar from "@material-ui/core/Avatar";
import ProfileImage from "./../../img/user-image.png";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    dialog: {},
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
        margin: "5% -6% 2% 0",
    },
    box: {
        padding: "0 3%",
        width: "90%",
    },
    inputRow: {
        marginBottom: "3%",
    },
    formLabel: {
        margin: "6% 4% 3% 4%",
        textAlign: "left",
    },
    descriptionLabel: {
        marginTop: "13%",
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "rgba(0, 0, 0, 0.8)",
    },
    prefix: {
        fontSize: ".85rem",
        fontWeight: "600",
        color: "lightgrey",
        borderRight: "1px solid lightgrey",
        textAlign: "center",
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
    },
    groupedInput: {
        border: "1px solid lightgray",
        borderRadius: "4px",
        width: "100%",
        margin: 0,
    },
    color: {
        listStyle: "none",
        borderRadius: "50%",
        border: "1px solid #d3d3d345",
        textIndent: "-9999px",
        width: "2rem",
        height: "2rem",
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
}));

export default function EventTypesTab() {
    const classes = useStyles();
    const [userEvents, setUserEvents] = useState([15, 30, 60]);
    const [openNewEvent, setOpenNewEvent] = useState(false);
    const [unit, setUnit] = useState("min");
    // todo prevent negative time
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
                fullWidth={true}
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
                            container={true}
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
                                    type="text"
                                    onChange={handleDurationChange}
                                    disableUnderline={true}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            direction="row"
                            alignItems="center"
                            container={true}
                            justify="flex-start"
                            className={classes.inputRow}
                        >
                            <Grid xs="2" item>
                                <InputLabel className={classes.label}>
                                    Duration
                                </InputLabel>
                            </Grid>

                            <Grid xs="10" item>
                                <Grid
                                    container={true}
                                    direction="row"
                                    alignItems="baseline"
                                    justify="space-evenly"
                                    wrap="nowrap"
                                    spacing="2"
                                    className={classes.groupedInput}
                                >
                                    <Grid item>
                                        <Input
                                            label="Duration"
                                            type="number"
                                            onChange={handleDurationChange}
                                            disableUnderline={true}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Select
                                            value={unit}
                                            onChange={handleUnitChange}
                                            label="Units"
                                            disableUnderline={true}
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
                                    placeholder={`Write a summary and details about your event.
                                    
                                    
                                    `}
                                    className={classes.textArea}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            direction="row"
                            alignItems="center"
                            container={true}
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
                                    container={true}
                                    direction="row"
                                    alignItems="baseline"
                                    justify="flex-start"
                                    spacing="2"
                                    wrap="nowrap"
                                    className={classes.groupedInput}
                                >
                                    {/* TODO: pass in user link prefix */}
                                    <Grid className={classes.prefix} item>
                                        calendapp.com/john-doe/
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            label="Link"
                                            type="text"
                                            onChange={handleDurationChange}
                                            disableUnderline={true}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            direction="row"
                            alignItems="center"
                            container={true}
                            justify="flex-start"
                            className={classes.inputRow}
                        >
                            <Grid xs="2" item>
                                <InputLabel className={classes.label}>
                                    Color
                                </InputLabel>
                            </Grid>

                            <Grid xs="10" item>
                                <ul>
                                    <Grid
                                        direction="row"
                                        alignItems="center"
                                        container={true}
                                        justify="flex-start"
                                        className={classes.inputRow}
                                    >
                                        {colors.map((color) => (
                                            <Grid xs="2" item>
                                                <li
                                                    className={`${classes.color} ${classes[color]}`}
                                                >
                                                    {color}
                                                </li>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </ul>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container={true}
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
