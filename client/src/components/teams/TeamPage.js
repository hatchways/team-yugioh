import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useUserData } from "../../providers/Context";
import TeamEventsTab from "../UserManagment/TeamEvents";
import CreateTeam from "./CreateTeam";
import axios from "axios";
import LoadingScrean from "../LoadingScrean";
import {useSetTeamData} from "../../providers/Context";

const TeamPage = () => {
  const userData = useUserData();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const setTeamData=useSetTeamData();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/team/members/${userData.teamId}`)
      .then(res => {
        setTeamData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [userData.teamId]);

  return (
    <div>
      {loading ? (
        <LoadingScrean />
      ) : userData.teamId ? (
        <div className={classes.container}>
          <TeamEventsTab teamID={userData.teamId} />
        </div>
      ) : (
        <>
          <Button
            className={classes.createTeamButton}
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Create new team
          </Button>
          <CreateTeam
            open={openDialog}
            closeDialog={() => {
              setOpenDialog(false);
            }}
          />
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  createTeamButton: {
    padding: ".5rem 2rem",
    textTransform: "none",
    marginBotton: theme.spacing(4)
  },
  container:{
    marginTop:"-2%"
  }
}));
export default TeamPage;
