import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import UserActionsMenu from "./UserActionsMenu";
import EditIcon from "@material-ui/icons/Edit";
import RemoveModal from "./RemoveModal";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "rgba(246, 128, 2, 0.1)",
    padding: "5px 10px",
    marginTop: 10
  },
  eventColor: {
    backgroundColor: props => props.eventColor,
    borderRadius: "50%",
    width: 20,
    height: 20,
    margin: "auto auto"
  },
  eventTypeSummary: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10
  },
  popoverButton: {
    borderRadius: 0,
    borderBottom: "none"
  },
  clearIcon: {
    marginLeft: "-12px"
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  duration: {
    color: "grey",
    fontSize: 12
  },
  link: {
    fontSize: 12
  }
});

export default function EventSummaryDisplay(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.innerContainer}>
        <div className={classes.eventColor}></div>
        <div className={classes.eventTypeSummary}>
          <span className={classes.title}>{props.title}</span>
          <span className={classes.duration}>{props.duration}</span>
        </div>
      </div>
      <div className={classes.link}>{props.link}</div>
      <UserActionsMenu>
        <Button
          variant="outlined"
          startIcon={<EditIcon className={classes.clearIcon} />}
          classes={{ root: classes.popoverButton }}
        >
          Edit
        </Button>
        <RemoveModal variant="remove_template" />
      </UserActionsMenu>
    </div>
  );
}
