import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  userDisplay: {
    display: "flex",
    flexDirection: "row",
    fontSize: 14
  },
  UserInfo: {
    display: "flex",
    flexDirection: "column"
  },
  avatar: {
    marginRight: 10
  },
  name: {},
  email: {
    color: "rgba(0, 0, 0, 0.44)"
  }
});

export default function UserInfoDisplay({ name, email }) {
  const classes = useStyles();

  return (
    <div className={classes.userDisplay}>
      <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
      <div className={classes.userInfo}>
        <div>{name}</div>
        <div className={classes.email}>{email}</div>
      </div>
    </div>
  );
}
