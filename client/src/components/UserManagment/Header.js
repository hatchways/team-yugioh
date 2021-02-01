import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import InviteNewUsers from "./InviteNewUsers";
import TeamNameInput from "./TeamNameInput";

const useStyles = makeStyles(theme => ({
  headerText: {
    fontWeight: "normal",
    fontSize: 22
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newUbutton: {
    padding: "9px 16px",
    fontSize: 16,
    fontWeight: "normal"
  }
}));

const Header = () => {
  const classes = useStyles();
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("Team 1");

  const toggleEditTeamName = () => {
    setEditTitle(!editTitle);
  };

  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    //use teams api to change name of the team
    toggleEditTeamName(false);
  };

  return (
    <div className={classes.header}>
      {editTitle ? (
        <TeamNameInput
          teamName={title}
          handleChange={handleChange}
          toggleNameChange={toggleEditTeamName}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Typography
          variant="h1"
          className={classes.headerText}
          onClick={toggleEditTeamName}
        >
          {title}
        </Typography>
      )}
      <InviteNewUsers />
    </div>
  );
};

export default Header;
