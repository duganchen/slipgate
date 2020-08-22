import React, { useEffect, useState } from "react";
import "./App.css";
import { Event } from "electron";

import { Grid } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");

interface QuakeMap {
  title: string;
}

interface QuakeMaps {
  [index: number]: QuakeMap;
}

function App() {
  const [maps, setMaps] = useState<Array<QuakeMap>>([]);

  useEffect(() => {
    ipcRenderer.send("fetch-maps");
    // ipcRenderer.on("maps", (event: Event, arg) => {
    //   arg.forEach((m: QuakeMap) => {
    //     try {
    //       console.log(m.title.localeCompare(""));
    //     } catch {
    //       console.log(m);
    //     }
    //   });
    //   setMaps(arg);
    // });
  });

  const mapList = maps
    // .sort((m1, m2) => m1["title"].localeCompare(m2["title"]))
    .map((m) => <p>{m["title"]}</p>);
  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid item xs={6}>
        // {mapList}
      </Grid>
      <Grid item xs={6}>
        <p>This is column 2</p>
      </Grid>
    </Grid>
  );
}

export default App;
