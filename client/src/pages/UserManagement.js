import React, { useEffect, useState } from "react";
import NavBar from "../components/Header/NavBar";
import UserManagementTabs from "../components/UserManagment/UserManagementTabs";
import { makeStyles, Container } from "@material-ui/core";
import Header from "../components/UserManagment/Header";
import { useUserData, useTeamData, useSetTeamData } from "../providers/Context";
import axios from "axios";
import LoadingScrean from "../components/LoadingScrean";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inherit",
    flexGrow: 1
  },
  main: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(5)
  },
  heading: {
    textAlign: "center"
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    fontSize: 16,
    color: "#909090"
  },
  cardContainer: {
    marginTop: theme.spacing(4)
  }
}));

const UserManagementPage = () => {
  const classes = useStyles();

  const teamData = useTeamData();
  const setTeamData = useSetTeamData();
  const [loading, setLoading] = useState(true);

  const userData = useUserData();

  useEffect(() => {
    axios
      .get(`/api/team/members/${userData.teamId}`)
      .then(res => {
        setTeamData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userData.teamId]);

  return (
    <div>
      {userData.isAdmin ? (
        <>
          <NavBar />

          <Container maxWidth="md" className={classes.main}>
            {loading ? (
              <LoadingScrean />
            ) : (
              <>
                <div className={classes.heading}>
                  <Header teamName={teamData.name} teamId={userData.teamId} />
                </div>

                <UserManagementTabs teamID={userData.teamId} />
              </>
            )}
          </Container>
        </>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
  );
};

export default UserManagementPage;
