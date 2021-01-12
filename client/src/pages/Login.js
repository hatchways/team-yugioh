import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import logo from "../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  formMain: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10%",
    fontFamily: theme.typography.fontFamily
  },
  footer: {
    fontFamily: theme.typography.fontFamily,
    padding: "5%",
    textAlign: "center"
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
  button: {
    background:
      "linear-gradient(270deg, rgba(247,132,0,1) 2%, rgba(247,105,0,1) 53%)",
    color: "white",
    padding: "15px 50px 15px 50px",
    marginTop: "15%"
  },
  link: {
    marginLeft: 3,
    color: "#f76900",
    textDecoration:"none"
  },
  paper: {
    width: "80%",
    margin: "auto"
  },
  formInput: {
    marginTop: "15%",
    width: "90%"
  },
  formLabel: {
    marginBottom: "-10px",
    textAlign: "center"
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
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.formMain}>
          <Typography variant="h4">Log into your account</Typography>
          <div className={classes.formInput}>
            <Typography variant="h6" className={classes.formLabel}>
              Enter your E-mail to get started
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              placeholder="E-mail address"
              autoFocus
              style={{ textAlign: "center" }}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
          </div>
          <Button size="large" className={classes.button}>
            Continue
          </Button>
        </div>
        <Divider />
        <div className={classes.footer}>
          <Typography variant="h6">
            {`Don't have an account?`}
            <Link className={classes.link} to="#">Sign up</Link>
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default LogInPage;
