import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Rating from "@material-ui/lab/Rating";
import { renderAuthors } from "./helpers";
import "./MapList.css";
import { Virtuoso } from "react-virtuoso";

import { Event } from "electron";
import { Maps, QuakeMap } from "../../../../main/src/types";

const { ipcRenderer } = window.require("electron");

interface MapListProps {
  detailsSetter: React.Dispatch<React.SetStateAction<string>>;
}

export const MapList = (props: MapListProps) => {
  const [maps, setMaps] = useState<Maps>({});

  useEffect(() => {
    ipcRenderer.send("fetch-maps");

    ipcRenderer.on("maps", (event: Event, arg: Maps) => {
      setMaps(arg);
    });
  }, []); // Adding [] ensures that the load only happens once, on first render

  const mapValues = Object.values(maps);
  console.log(mapValues.length);

  return (
    <Virtuoso
      totalCount={mapValues.length}
      item={(index) => {
        const map = mapValues[index];
        return (
          <ListItem
            key={map.id}
            alignItems="flex-start"
            button
            onClick={() => {
              props.detailsSetter(map.description);
            }}
          >
            <Grid
              container
              onClick={() => {
                console.log(map.description);
              }}
            >
              <Grid item xs>
                <ListItemText
                  primary={map.title}
                  secondary={renderAuthors(map.authors)}
                />
              </Grid>
              <Grid item className="MapList__Item-Secondary">
                <Rating value={map.rating} readOnly size="small" />
              </Grid>
            </Grid>
          </ListItem>
        );
      }}
    />
  );
};
