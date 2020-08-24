import React, { useEffect, useState } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { renderAuthors } from './helpers';
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
      console.log(arg);
    });
  }, []);

  return <List className="MapList">
    {Object.values(maps).map((m: QuakeMap) =>
      <ListItem key={m.id}>
        { console.log(m) }
        <ListItemText primary={m.title} secondary={renderAuthors(m.authors)} />
      </ListItem>
    )}
  </List>;
}