import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

export const PackageItem = (props: {
  style: React.CSSProperties;
  primary: string;
}) => {
  return (
    <ListItem style={props.style}>
      <ListItemText primary={props.primary} />
    </ListItem>
  );
};
