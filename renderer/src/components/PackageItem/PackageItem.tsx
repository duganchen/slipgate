import React from "react";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import { QuakeMap } from "../types";

export const PackageItem = (props: {
  map: QuakeMap;
  setMap: React.Dispatch<React.SetStateAction<QuakeMap | null>>;
}) => {
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => {
        props.setMap(props.map);
      }}
    >
      <Grid container>
        <Grid item xs>
          <ListItemText
            primary={props.map.title}
            secondary={props.map.secondary}
          />
        </Grid>
        <Grid item className="MapList__Item-Secondary">
          <p>{props.map.rating}</p>
        </Grid>
      </Grid>
    </ListItem>
  );
};
