import React from "react";
import NavBar from "../components/Header/NavBar";
import UserManagementTabs from "../components/UserManagment/UserManagementTabs";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Divider,
  Button,
  Container
} from "@material-ui/core";
import Header from "../components/UserManagment/Header";

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

  return (
    <div>
      <NavBar />

      <Container maxWidth="md" className={classes.main}>
        <div className={classes.heading}>
          <Header/>
        </div>
       
          <UserManagementTabs/>
    
      </Container>
    </div>
  );
};

export default UserManagementPage;
