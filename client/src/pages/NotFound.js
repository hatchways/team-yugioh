import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function NotFound() {
  return (
    <div>
      <Typography variant="h2">Whoops!</Typography>
      <Typography variant="h3">{"This page doesn't exist"}</Typography>
      <Link to="/">Take me home!</Link>
    </div>
  );
}
