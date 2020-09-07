import React from "react";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import { QuakeMap } from "../types";
import { renderAuthors } from "./helpers";

export const PackageItem = (props: {
  style: React.CSSProperties;
  map: QuakeMap;
}) => {
  return (
    <ListItem alignItems="flex-start" style={props.style} button>
      <Grid container>
        <Grid item xs>
          <ListItemText
            primary={props.map.title}
            secondary={`${props.map.id}.zip`}
          />
        </Grid>
        <Grid item className="MapList__Item-Secondary">
          <p>{props.map.rating}</p>
        </Grid>
      </Grid>
    </ListItem>
  );
};
