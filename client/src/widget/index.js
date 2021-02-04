import React from "react";
import ReactDom from "react-dom";

const Widget = () => {
  return <div>Hello world</div>;
};

ReactDom.render(
  <Widget />,
  document.getElementById("calend-app-inline-widget")
);
