import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import InviteNewUsers from "./InviteNewUsers";
import TeamNameInput from "./TeamNameInput";
import axios from "axios";
import {useTeamData, useSetTeamData, useTeamEvents, useSetTeamEvents} from "../../providers/Context";

const useStyles = makeStyles(theme => ({
  headerText: {
    fontWeight: "normal",
    fontSize: 22
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newUbutton: {
    padding: "9px 16px",
    fontSize: 16,
    fontWeight: "normal"
  }
}));

const Header = () => {
  const classes = useStyles();
  const {name, _id}=useTeamData();
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(`${name}`);
  const toggleEditTeamName = () => {
    setEditTitle(!editTitle);
  };

  const handleSubmit = newName => {
    //call api to change team name:
    //if successful setTitle
    axios.post(
      "/api/team/updatename",
      { teamId: _id, name: newName },
      {
        withCredentials: true
      }
    ).then(res=>{
      setTitle(newName);
      toggleEditTeamName(false);
    }).catch(err=>console.log(err));
    
  };

  return (
    <div className={classes.header}>
      {editTitle ? (
        <TeamNameInput
          teamName={name}
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
      <InviteNewUsers teamId={_id} />
    </div>
  );
};

export default Header;
