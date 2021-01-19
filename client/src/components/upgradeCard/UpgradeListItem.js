import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
    itemText:{
      color:"#898989",
      fontSize:14,
      fontWeight:400
    }
  }));


const PlanListItem=({itemText})=>{
    const classes=useStyles();

    return(
        <ListItem classes={{ root: classes.item }}>
          <ListItemIcon classes={{root:classes.ListItemIcon}}>
            <CheckIcon className={classes.icon}/>
          </ListItemIcon>
          <span className={classes.itemText}>{itemText}</span>
        </ListItem>
    )
}

export default PlanListItem;