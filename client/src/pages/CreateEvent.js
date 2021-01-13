import React from "react";
import axios from "axios";
import mongoose from "mongoose";

function CreatEvent(props) {
    return (
        <>
            <MeetingCard type={15} />
            <MeetingCard type={30} />
            <MeetingCard type={60} />
        </>
    );
}

function MeetingCard({ type }) {
    function addEvent() {
        axios
            .post("/api/event", {
                // user_id will need to be swapped out when we get authentication, can remove mongoose from FE at that point too
                user_id: new mongoose.Types.ObjectId(),
                duration: type,
            })
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <button onClick={addEvent}>
            <h2>{type} minute meeting</h2>
        </button>
    );
}

// create new event type

export default CreatEvent;
