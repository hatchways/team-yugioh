import React from "react";
import {
    Paper,
    Grid,
    makeStyles,
    Typography,
    Divider,
    Button,
    Container
  } from "@material-ui/core";
  import AddIcon from '@material-ui/icons/Add';

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
           <Button variant="outlined" startIcon={<AddIcon/>} className={classes.newUbutton}>New User</Button>
       </div>
    )
}

export default Header;