import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Rating from "@material-ui/lab/Rating";
import { renderAuthors } from "./helpers";
import "./MapList.css";

import { Event } from "electron";
import { Maps, QuakeMap } from "../../../../main/src/types";

const { ipcRenderer } = window.require("electron");

export const MapList = () => {
  const [maps, setMaps] = useState<Maps>({});

  useEffect(() => {
    ipcRenderer.send("fetch-maps");

    ipcRenderer.on("maps", (event: Event, arg: Maps) => {
      setMaps(arg);
    });
  }, []); // Adding [] ensures that the load only happens once, on first render

  return (
    <List className="MapList">
      {Object.values(maps).map((m: QuakeMap) => (
        <ListItem key={m.id} alignItems="flex-start" button>
          <Grid
            container
            onClick={() => {
              console.log(m.description);
            }}
          >
            <Grid item xs>
              <ListItemText
                primary={m.title}
                secondary={renderAuthors(m.authors)}
              />
            </Grid>
            <Grid item className="MapList__Item-Secondary">
              <Rating value={m.rating} readOnly size="small" />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};
