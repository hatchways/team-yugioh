import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Grid,
    Input,
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
    instruction: {
        width: "100%",
        textAlign: "center",
        marginBottom: "3%",
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
    formLabel: {
        marginTop: "2%",
        textAlign: "center",
    },
    groupedInput: {
        border: "1px solid lightgray",
        borderRadius: "4px",
        padding: "0 3%",
        width: "fit-content",
        margin: "auto",
    },
}));

export default function EventTypesTab() {
    const classes = useStyles();
    const [userEvents, setUserEvents] = useState([15, 30, 60]);
    const [openNewEvent, setOpenNewEvent] = useState(false);
    const [unit, setUnit] = useState("min");
    const [duration, setDuration] = useState();

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

        // TODO: make card titles change to xx hours xx mins for time > 60

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
                classes={{
                    root: classes.root,
                }}
                fullWidth={true}
                maxWidth="sm"
            >
                <Box className={classes.box}>
                    <DialogTitle
                        id="form-dialog-title"
                        variant="h6"
                        className={classes.formLabel}
                    >
                        Create New Event Type
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.instruction}>
                            Please choose how long your new event type will be.
                        </DialogContentText>
                        <Grid
                            container={true}
                            direction="row"
                            alignItems="baseline"
                            justify="center"
                            spacing="2"
                            className={classes.groupedInput}
                        >
                            <Grid item>
                                <Input
                                    autoFocus
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
                                    <MenuItem value={"min"}>minutes</MenuItem>
                                    <MenuItem value={"hour"}>hours</MenuItem>
                                </Select>
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
