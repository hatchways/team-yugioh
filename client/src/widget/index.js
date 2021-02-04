import React from "react";
import ReactDom from "react-dom";

import EmbeddedScheduler from "./EmbeddedScheduler";
import { theme } from "../themes/theme";
import { MuiThemeProvider } from "@material-ui/core";

const Widget = () => {
  const element = document.getElementById("calend-app-inline-widget");
  const url = element.getAttribute("data-url");
  const [hostName, eventName] = url.split("/");
  return (
    <MuiThemeProvider theme={theme}>
      <EmbeddedScheduler hostName={hostName} eventName={eventName} />
    </MuiThemeProvider>
  );
};

ReactDom.render(
  <Widget />,
  document.getElementById("calend-app-inline-widget")
);
