import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import UserActionsMenue from "./UserActionsMenu";
import { Clear } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import RemoveModal from "./RemoveModal";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 30
  },
  tableHeading: {
    fontWeight: "normal",
    fontSize: 14,
    color: "#8f8f8f"
  },
  link: {
    textDecoration: "none",
    color: "#00a2ff",
    fontSize: 14
  },
  popoverButton: {
    borderRadius: 0,
    borderBottom: "none"
  },
  clearIcon: {
    marginLeft: "-20px"
  }
});

//delete once connected to api
function createData(email, status, dateInvited) {
  return { email, status, dateInvited };
}

//dummy data
const rows = [
  createData("kozaktaras15@gmail.com", "Pending", "27 January 20201"),
  createData("john-doe@gmail.com", "Pending", "27 January 2021")
];

export default function PendingTab() {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell classes={{ head: classes.tableHeading }}>
              Email
            </TableCell>
            <TableCell align="center" classes={{ head: classes.tableHeading }}>
              Status
            </TableCell>
            <TableCell align="center" classes={{ head: classes.tableHeading }}>
              Date Invited
            </TableCell>
            <TableCell
              align="center"
              classes={{ head: classes.tableHeading }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} className={classes.row}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.dateInvited}</TableCell>
              <TableCell align="center">
                <UserActionsMenue>
                  <RemoveModal variant="remove_invite" email={row.email} />
                </UserActionsMenue>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
