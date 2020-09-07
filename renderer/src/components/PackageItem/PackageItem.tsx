import React from "react";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import { QuakeMap } from "../types";
import { renderAuthors } from "../MapList/helpers";
import Rating from "@material-ui/lab/Rating";

export const PackageItem = (props: {
  style: React.CSSProperties;
  map: QuakeMap;
}) => {
  return (
    <ListItem key={props.map.id} alignItems="flex-start" button>
      <Grid container>
        <Grid item xs>
          <ListItemText
            primary={props.map.title}
            secondary={renderAuthors(props.map.authors)}
          />
        </Grid>
        <Grid item className="MapList__Item-Secondary">
          <Rating value={props.map.rating} readOnly size="small" />
        </Grid>
      </Grid>
    </ListItem>
  );
};
