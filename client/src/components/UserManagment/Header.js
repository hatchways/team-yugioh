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

const Header = ({teamName}) => {
  const classes = useStyles();
  const [editTitle, setEditTitle] = useState(false);
  

  console.log("teamName header:", teamName)
  const [title, setTitle] = useState(`${teamName}`);
  const toggleEditTeamName = () => {
    setEditTitle(!editTitle);
  };


  const handleSubmit = (newName) => {
    //call api to change team name:
    //if successful setTitle
    setTitle(newName)
    toggleEditTeamName(false);
  };

  return (
    <div className={classes.header}>
      {editTitle ? (
        <TeamNameInput
          teamName={title}
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
