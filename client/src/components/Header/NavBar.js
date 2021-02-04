import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
//NEW Desktop NavBar
import Grid from "@material-ui/core/Grid";

// Mobile NavBar
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

import Logo from "../../assets/logo.png";
import ImageUploader from "../UploadModal/ImageUploader";
import UserMenu from "../UserMenu";

import { useUserData } from "../../providers/Context";

const CalendLogo = () => <img width="110rem" src={Logo} alt="CalendApp logo" />;
const HomeLink = () => (
  <Link variant="subtitle1" href="/home" style={{ color: "black" }}>
    Home
  </Link>
);

const UpgradeLink = () => (
  <Link variant="subtitle1" href="/upgrade" style={{ color: "darkorange" }}>
    Upgrade account
  </Link>
);

const ProfilePhoto = ({ handleClickOpen }) => {
  const { photoUrl } = useUserData();
  return (
    <Badge
      style={{ cursor: "pointer" }}
      onClick={handleClickOpen}
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <Avatar
          style={{
            width: 14,
            height: 14,
            color: "lightgrey",
            boxShadow:
              "0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2)",
          }}
        >
          <PhotoCameraIcon style={{ width: 10, height: 10, color: "black" }} />
        </Avatar>
      }
    >
      <Avatar
        src={
          photoUrl ||
          "https://cal-app-user-imgs.s3.amazonaws.com/1611973087364.png"
        }
        alt="User image"
      />
    </Badge>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    flexGrow: 1,
    padding: "0.6rem 3rem",
  },
  title: {
    flexGrow: 1,
  },
  linkGrid: {
    width: 350,
  },
  profile: {
    "&:hover": {
      opacity: 0.8,
    },
  },
  drawerContainer: {
    padding: "30px 30px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { name } = useUserData();

  // Handle modal open
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //Handle responsive screen sizing
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  // DESKTOP SETUP
  const displayDesktop = () => {
    return (
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <CalendLogo className={classes.title} />
          </Grid>
          <Grid item className={classes.linkGrid}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <HomeLink />
              <UpgradeLink />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                classes={classes.profileBox}
                style={{ width: 130 }}
              >
                <ProfilePhoto
                  className={classes.profile}
                  handleClickOpen={handleClickOpen}
                />
                <UserMenu name={name} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };
  // MOBILE SETUP
  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>
          <CalendLogo />
        </div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="flex-start"
          style={{ height: 120 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            classes={classes.profileBox}
            style={{ width: 130 }}
          >
            <ProfilePhoto
              style={{ paddingTop: "8px" }}
              handleClickOpen={handleClickOpen}
            />
            <UserMenu name={"Matt H"} />
          </Box>
          <HomeLink />
          <UpgradeLink />
        </Grid>
      </>
    );
  };

  return (
    <header>
      <AppBar className={classes.header} position="static">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
      <ImageUploader open={open} onClose={handleClose} />
    </header>
  );
}
