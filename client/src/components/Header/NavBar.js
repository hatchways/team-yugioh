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
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

// Mobile NavBar
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core";

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
      style={{
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
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

const useStyles = makeStyles({
  header: {
    backgroundColor: "white",
    flexGrow: 1,
    padding: "0.6rem 3rem",
  },
});

export default function Header() {
  const classes = useStyles();
  const { name } = useUserData();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <CalendLogo />
        <HomeLink />
        <UpgradeLink />
        <ProfilePhoto handleClickOpen={handleClickOpen} />
        <UserMenu name={name} />
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar className={classes.header} position="static">
        {displayDesktop()}
      </AppBar>
      <ImageUploader open={open} onClose={handleClose} />
    </header>
  );
}
