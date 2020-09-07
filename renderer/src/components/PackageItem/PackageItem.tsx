import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { QuakeMap } from "../types";

export const PackageItem = (props: {
  style: React.CSSProperties;
  map: QuakeMap;
}) => {
  return (
    <ListItem style={props.style}>
      <ListItemText primary={props.map.description} />
    </ListItem>
  );
};
