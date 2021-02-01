import React from "react";
import {
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import InviteNewUsers from "./InviteNewUsers";

  const useStyles = makeStyles(theme => ({
   headerText:{
       fontWeight:"normal",
       fontSize:22,
   },
   header:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-between"
   },
   newUbutton:{
       padding:"9px 16px",
       fontSize:16,
       fontWeight:"normal"
   }
  }));

const Header=()=>{

    const classes=useStyles();

    return(
       <div className={classes.header}>
           <Typography variant="h1" className={classes.headerText}>Users</Typography>
           <InviteNewUsers/>
       </div>
    )
}

export default Header;