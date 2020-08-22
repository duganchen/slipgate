import React, { useEffect, useState } from "react";
import "./App.css";
import { Event } from "electron";

import { Grid } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");

function App() {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    ipcRenderer.send("fetch-maps");
    ipcRenderer.on("maps", (event: Event, arg) => {
      setMaps(arg);
    });
  });

  const mapList = maps.map((m) => <p>{m["title"]}</p>);
  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid item xs={6}>
        {mapList}
      </Grid>
      <Grid item xs={6}>
        <p>This is column 2</p>
      </Grid>
    </Grid>
  );
}

export default App;
