import React from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import logo from "../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10%",
    fontFamily: theme.typography.fontFamily
  },
  logo: {
    marginTop: "10vh",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "5vh"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button:{
      background:"linear-gradient(270deg, rgba(247,132,0,1) 2%, rgba(247,105,0,1) 53%)",
      color:"white",
      padding:"10px 30px 10px 30px"
  },
  link:{
      marginLeft:3,
      color:"#f76900"
  }
}));

const LogInPage = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="sm"
      classes={{
        root: classes.root
      }}
    >
      <img src={logo} alt="company logo" className={classes.logo} />
      <Paper elevation={5}>
      <div className={classes.paper}>
        <Typography variant="h4">Log into your account</Typography>
        <Typography variant="h6">Enter your E-mail to get started</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          placeholder="email"
          autoFocus
        />
        <Button size="large" className={classes.button}>Continue</Button>
        </div>
        <Divider/>
        <div className={classes.paper}>
        <Typography variant="h6">{`Don't have an account?`}<span className={classes.link}>Sign up</span></Typography>
        
        </div>
      </Paper>
    </Container>
  );
};

export default LogInPage;
