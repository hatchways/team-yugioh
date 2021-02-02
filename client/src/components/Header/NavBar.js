import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import Logo from "../../assets/logo.png";
import ImageUploader from "../UploadModal/ImageUploader";
import UserMenu from "../UserMenu"

import { useUserData } from "../../providers/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "white",
    padding: "0.6rem 3rem",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "black",
    marginRight: theme.spacing(3),
    cursor: "pointer",
    fontWeight: "bold",
  },
  linkToUpgrade: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(8),
    cursor: "pointer",
    fontWeight: "bold",
  },
  profileImg: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
}));

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const { name, photoUrl } = useUserData();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <span className={classes.title}>
          <img width="110rem" src={Logo} alt="CalendApp logo" />
        </span>

        <Link variant="subtitle1" className={classes.link} href="/home">
          Home
        </Link>
        <Link variant="subtitle1" className={classes.link}>
          Integration
        </Link>
        <Link
          variant="subtitle1"
          className={classes.linkToUpgrade}
          href="/upgrade"
        >
          Upgrade account
        </Link>

        <Box>
          <Avatar
            className={classes.profileImg}
            src={photoUrl}
            alt="User image"
            onClick={handleClickOpen}
          />
        </Box>
        <UserMenu name={name}/>
      </Toolbar>
      <ImageUploader open={open} onClose={handleClose} />
    </AppBar>
  );
}
