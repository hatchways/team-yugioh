import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";
import mongoose from "mongoose";

function CreatEvent(props) {
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

    return (
        <>
            <button onClick={handleClickOpen}>Create new event type</button>
            {userEvents.map((type) => (
                <MeetingCard type={type} key={type} />
            ))}
            <Dialog
                open={openNewEvent}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Create New Event Type
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose how long you would like your new event
                        type to be.
                    </DialogContentText>
                    <Grid container={true} alignItems="baseline">
                        <TextField
                            autoFocus
                            label="Duration"
                            type="number"
                            onChange={handleDurationChange}
                        />
                        <Select
                            value={unit}
                            onChange={handleUnitChange}
                            label="Units"
                        >
                            <MenuItem value={"min"}>minutes</MenuItem>
                            <MenuItem value={"hour"}>hours</MenuItem>
                        </Select>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createNewEventType} color="primary">
                        Create New Event Type
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function MeetingCard({ type }) {
    function addAppointment() {
        axios
            .post("/api/appointment", {
                // dummy data
                meeting_id: new mongoose.Types.ObjectId(),
                name: "test user",
                email: "test@test.com",
                time: new Date(),
                timezone: "PST",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <button onClick={addAppointment}>
            <h2>{type} minute meeting</h2>
        </button>
    );
}

export default CreatEvent;
