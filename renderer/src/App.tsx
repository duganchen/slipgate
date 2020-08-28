import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MapList from "./components/MapList";
import "./App.css";

function App() {
  const [mapDetails, setMapDetails] = useState("");

  return (
    <Grid container direction="row" alignItems="stretch" className="AppGrid">
      <Grid item xs={6}>
        <MapList detailsSetter={setMapDetails} />
      </Grid>
      <Grid item xs={6}>
        <p dangerouslySetInnerHTML={{ __html: mapDetails }}></p>
      </Grid>
    </Grid>
  );
}

export default App;
