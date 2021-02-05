import React, {useEffect, useState} from "react";
import NavBar from "../components/Header/NavBar";
import UserManagementTabs from "../components/UserManagment/UserManagementTabs";
import {
  makeStyles,
  Container
} from "@material-ui/core";
import Header from "../components/UserManagment/Header";
import {useUserData} from "../providers/Context"
import axios from "axios";


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

  const [teamData, setTeamData]=useState({})

  const team= useUserData();

  useEffect(()=>{
    axios.get(`/api/team/${team.teamId}`).then(res=>{setTeamData(res.data)
    console.log(res)}).catch(err=>console.log(err))
  },[team.teamId])


  return (
    <div>
      <NavBar />

      <Container maxWidth="md" className={classes.main}>
        <div className={classes.heading}>
          <Header teamName={teamData.name}/>
        </div>
       
          <UserManagementTabs/>
    
      </Container>
    </div>
  );
};

export default UserManagementPage;
