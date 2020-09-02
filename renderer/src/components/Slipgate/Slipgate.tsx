import React, { useState } from "react";
import { AppBar, Box, Tabs, Tab, Toolbar } from "@material-ui/core";
import Packages from "../Packages";
import Configuration from "../Configuration";

export const Slipgate = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Tabs
            value={tabIndex}
            onChange={(value, newValue) => {
              setTabIndex(newValue);
            }}
          >
            <Tab label="Packages" />
            <Tab label="Engine Configuration" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box flexDirection="column" display="flex" height="100%">
        <Toolbar />
        {tabIndex ? <Configuration /> : <Packages />}
      </Box>
    </>
  );
};
