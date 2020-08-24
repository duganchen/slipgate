import React from "react";
import { Grid } from "@material-ui/core";
import MapList from './components/MapList';
import "./App.css";

function App() {
  return (
    <Grid container direction="row" alignItems="stretch" className="AppGrid">
      <Grid item xs={6}>
        <MapList />
      </Grid>
      <Grid item xs={6}>
        <p>This is column 2</p>
      </Grid>
    </Grid>
  );
}

export default App;
