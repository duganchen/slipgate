import React, { useState } from "react";
import MapList from "./components/MapList";
import { AppBar, Drawer, IconButton, Toolbar, Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./App.css";

function App() {
  const [mapDetails, setMapDetails] = useState("");
  const [drawerIsOpen, setDrawerIsOpen] = useState(true);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton>
            <MenuIcon
              onClick={() => {
                console.log("clicked");
                setDrawerIsOpen(!drawerIsOpen);
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerIsOpen}
        onClose={() => {
          console.log("closing");
          setDrawerIsOpen(false);
        }}
      >
        <p>This is in the drawer</p>
      </Drawer>
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
