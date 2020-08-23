import React, { useEffect, useState } from "react";
import "./App.css";
import { Event } from "electron";

import { Grid } from "@material-ui/core";

import { Maps, QuakeMap } from "../../main/src/types";

const { ipcRenderer } = window.require("electron");

function App() {
  const [maps, setMaps] = useState<Maps>({});

  useEffect(() => {
    ipcRenderer.send("fetch-maps");

    ipcRenderer.on("maps", (event: Event, arg: Maps) => {
      setMaps(arg);
    });
  });

  const mapList = Object.values(maps).map((m: QuakeMap) => {
    return <p key={m.id}>{m.label}</p>;
  });

  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid item xs={6}></Grid>
      {mapList}
      <Grid item xs={6}>
        <p>This is column 2</p>
      </Grid>
    </Grid>
  );
}

export default App;
