import React, { useEffect } from "react";
import "./App.css";
import { Event } from "electron";

import { Grid } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");

function App() {
  useEffect(() => {
    ipcRenderer.send("fetch-maps");
    ipcRenderer.on("maps", (event: Event, arg) => {
      console.log("Received maps");
      console.log(arg);
      console.log("That's the arg");
    });
  });
  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid item xs={6}>
        <p>This is column 1</p>
      </Grid>
      <Grid item xs={6}>
        <p>This is column 2</p>
      </Grid>
    </Grid>
  );
}

export default App;
