import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import PlanListItem from "./UpgradeListItem";

const useStyles = makeStyles(theme => ({
  paper:{
    maxWidth:"300px",
    height:"280px",
    paddingTop:"5%",
    paddingBottom:"5%",
  },
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
    marginTop:"10%",
    margin:"auto",
    width:"45%",
    backgroundColor: "#FFF",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  item: {
    padding: 0,
  },
  ListItemIcon: {
    minWidth: 0,
    marginRight:10
  },
  icon:{
    fontSize:16,
    color:theme.palette.primary.main
  },
  listContainer:{
    paddingTop:"5%"
  },
  itemText:{
    color:"#898989",
    fontSize:14,
    fontWeight:500
  },
  border:{
    borderStyle:"solid",
    borderWidth:"2px",
    color:theme.palette.primary.main
  }
}));

const UpgradeCard = ({ title, titleColor, featuresList, price, selected }) => {
  const classes = useStyles();
  const elevation=selected?20:8;
  console.log(featuresList)

  return (
    <Paper elevation={elevation} className={selected?`${classes.paper} ${classes.border}`:classes.paper}>
      <div className={classes.root}>
        <Typography variant="h5" className={classes[titleColor]}>
          {title}
        </Typography>
        <Typography variant="subtitle1">{price}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          classes={{ root: classes.buttonRoot }}
          disabled={selected}
        >
          {selected?"Active":"Upgrade"}
        </Button>
      </div>
      <Divider />
      <div className={`${classes.root} ${classes.listContainer}`}>
        <List>
          {featuresList.map(item=>(<PlanListItem itemText={item}/>))}
        </List>
      </div>
    </Paper>
  );
};

export default UpgradeCard;
