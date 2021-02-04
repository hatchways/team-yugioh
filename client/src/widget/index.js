import React from "react";
import ReactDom from "react-dom";

import EmbeddedScheduler from "./EmbeddedScheduler";

const Widget = () => {
  const element = document.getElementById("calend-app-inline-widget");
  const url = element.getAttribute("data-url");
  const [hostName, eventName] = url.split("/");
  return <EmbeddedScheduler hostName={hostName} eventName={eventName} />;
};

ReactDom.render(
  <Widget />,
  document.getElementById("calend-app-inline-widget")
);
