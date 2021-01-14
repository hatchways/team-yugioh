import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box'
import { shadows } from '@material-ui/system';

import Logo from './../../img/logo.png';
import ProfileImage from './../../img/user-image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'white',
    padding: '1.5rem 3rem',
    
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'black',
    marginRight: theme.spacing(3),
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  linkToUpgrade: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(8),
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  profileImg: {
    marginRight: theme.spacing(2),
    marginLef: theme.spacing(4),
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <AppBar className={classes.root} position='static'>
      <Toolbar>
        <span className={classes.title}>
          <img width='110rem' src={Logo} />
        </span>


        <Link
          variant='subtitle1'
          onClick={preventDefault}
          className={classes.link}
        >
          Home
        </Link>
        <Link
          variant='subtitle1'
          onClick={preventDefault}
          className={classes.link}
        >
          Integration
        </Link>
        <Link
          variant='subtitle1'
          onClick={preventDefault}
          className={classes.linkToUpgrade}
        >
          Upgrade account
        </Link>

        <Avatar
          className={classes.profileImg}
          src={ProfileImage}
          alt='User image'
        />

        <Link
          variant='subtitle1'
          onClick={preventDefault}
          className={classes.link}
        >
          John Doe
        </Link>
      </Toolbar>
    </AppBar>
  );
}
