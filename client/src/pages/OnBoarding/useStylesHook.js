import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    width: "30em",
  },
  verticalGrid: {
    height: "20em",
  },
  mainContent: {
    height: "15em",
    flexGrow: 1,
  },
  gridForMainContent: {
    height: "100%",
  },
  topContent: {
    padding: "2em",
    height: "6em",
  },
  continueButton: {
    margin: "2em 0 3em 0",
  },
  pageOneEntry: {
    margin: "1.5em 2em",
  },
  pageTwoEntry: {
    margin: "0.4em 2em",
  },
  pageTwoRoot: {
    flexGrow: 1,
  },
  urlPrefixInput: {
    width: "8em",
    lineHeight: "1.2em",
  },
  urlInput: {
    width: "6em",
    lineHeight: "1.2em",
  },
  progressBar: {
    width: "11em",
    margin: "1em",
    padding: 0,
  },
  linearProgress: {
    width: "100%",
  },
}));

export default useStyles;
