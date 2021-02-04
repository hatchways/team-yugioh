import React from "react";
import ReactDom from "react-dom";

import EmbeddedScheduler from "./EmbeddedScheduler";

const Widget = () => {
  const element = document.getElementById("calend-app-inline-widget");
  const url = element.getAttribute("data-url");
  const [hostName, eventName] = url.split("/");
  console.log("hostName, eventName", hostName, eventName);
  return <div>Hello world</div>;
};

ReactDom.render(
  <Widget />,
  document.getElementById("calend-app-inline-widget")
);
