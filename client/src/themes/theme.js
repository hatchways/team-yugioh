import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
    subtitle1: {
      fontWeight: 600, //for bold text
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.7rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: 16,
      color:"grey"
    },
  },
  palette: {
    primary: {
      main: "#f68002",
      button:
        "linear-gradient(270deg, rgba(247,132,0,1) 2%, rgba(247,105,0,1) 53%)"
    },
    secondary: {main: "#e06602"}
  },
  overrides: {
    MuiPickersDay: {
      daySelected: {
        color: "white",
      },
    },
  },
});
