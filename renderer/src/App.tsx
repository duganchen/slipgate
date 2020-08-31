import React, { useEffect, useState } from "react";
import MapList from "./components/MapList";
import {
  AppBar,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./App.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

function App() {
  const [mapDetails, setMapDetails] = useState("");
  const [drawerIsOpen, setDrawerIsOpen] = useState(true);
  const [executable, setExecutable] = useState("");
  const [basedir, setBasedir] = useState("");

  useEffect(() => {
    if (executable === "") {
      setExecutable(localStorage.getItem("exe") || "");
    } else {
      localStorage.setItem("exe", executable);
    }

    if (basedir === "") {
      setBasedir(localStorage.getItem("basedir") || "");
    } else {
      localStorage.setItem("basedir", basedir);
    }
  }, [executable, basedir]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={() => {
              console.log("clicked");
              setDrawerIsOpen(!drawerIsOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerIsOpen}
        onClose={() => {
          console.log("closing");
          setDrawerIsOpen(false);
        }}
      >
        <IconButton
          onClick={() => {
            setDrawerIsOpen(false);
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <TextField
          label="Quake Executable"
          value={executable}
          onChange={(event) => {
            setExecutable(event.target.value);
          }}
        />
        <TextField
          label="Quake Directory"
          value={basedir}
          onChange={(event) => {
            setBasedir(event.target.value);
          }}
        />
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
