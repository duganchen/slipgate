import React, { useState } from "react";
import MapList from "./components/MapList";
import { AppBar, IconButton, Toolbar, Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./App.css";

function App() {
  const [mapDetails, setMapDetails] = useState("");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container direction="row" alignItems="stretch" className="AppGrid">
        <Grid item xs={6}>
          <MapList detailsSetter={setMapDetails} />
        </Grid>
        <Grid item xs={6}>
          <p dangerouslySetInnerHTML={{ __html: mapDetails }}></p>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
