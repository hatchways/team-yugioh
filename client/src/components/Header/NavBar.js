import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: 'white',
  },
  link: {
    color: 'black',
    marginRight: theme.spacing(2),
    fontSize: 18,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  linkOrange: {
    color: deepOrange[500],
    marginRight: theme.spacing(2),
    fontSize: 18,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  profileImg: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    marginRight: theme.spacing(2),
    marginLef: theme.spacing(4),
  },

}));

export default function NavBar () {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

return (
  <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <span className={classes.orangeText}>calend</span>App
          </Typography>
          
            <Link onClick={preventDefault} className={classes.link}>
              Home
            </Link>
            <Link onClick={preventDefault} className={classes.link}>
              Integration
            </Link>
            <Link onClick={preventDefault} className={classes.linkOrange}>
              Upgrade
            </Link>
          
          
            <Avatar className={classes.profileImg}>JD</Avatar>
            <Link onClick={preventDefault} className={classes.link}>
              Jane Doe
            </Link>
          
        </Toolbar>
      </AppBar>
)
}
