import React, { useState, useEffect } from "react";
import axios from "axios";
import mongoose from "mongoose";

function CreatEvent(props) {
    const [userEvents, setUserEvents] = useState([15, 30, 60]);
    // replace with actual user id
    const userId = "5ffe8c395a611a0000d0c692";

    useEffect(() => {
        axios
            .get("/api/event?user_id=" + userId)
            .then((res) => {
                console.log(res);
                const oldEventTypes = res.data.map(({ duration }) => duration);
                setUserEvents([...userEvents, ...oldEventTypes]);
            })
            .catch((err) => console.log(err));
    }, []);

    function createNewEventType() {
        axios
            .post("/api/event", {
                user_id: userId,
                duration: Math.floor(Math.random() * 60),
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <button onClick={createNewEventType}>Create new event type</button>
            {userEvents.map((type) => (
                <MeetingCard type={type} key={type} />
            ))}
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
