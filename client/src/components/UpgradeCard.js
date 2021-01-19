import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10%",
    width: 200,
    maxHeight: theme.spacing(26),
    textAlign: "center",
    margin: "auto"
  },
  color1: {
    color: "#7900ff"
  },
  color2: {
    color: "#89b800"
  },
  buttonRoot: {
    backgroundColor: "#FFF",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: theme.palette.primary.main,
      color: "white"
    },
  listItem:{
    padding:0
  }
  }
}));

const UpgradeCard = ({ title, titleColor, feturesList, price }) => {
  const classes = useStyles();

  return (
    <Paper elevation={6}>
      <div className={classes.root}>
      <Typography variant="h5" className={classes[titleColor]}>
        {title}
      </Typography>
      <Typography variant="subtitle1">{price}</Typography>
      <Button
        variant="outlined"
        color="secondary"
        classes={{ root: classes.buttonRoot }}
      >
        Upgrade
      </Button>
      </div>
    <Divider/>
    <div className={classes.root}>
    <List>
      <ListItem className={classes.listItem}>
        hello
      </ListItem>
      <ListItem className={classes.listItem}>
        hello
      </ListItem>
      <ListItem className={classes.listItem}>
        hello
      </ListItem>
    </List>
    </div>
    </Paper>
  );
};

export default UpgradeCard;
