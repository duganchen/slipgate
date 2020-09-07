import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import PackageInteraction from "../PackageInteraction";
import PackageList from "../PackageList";
import { Maps } from "../types";
const { ipcRenderer } = window.require("electron");

export const Packages = () => {
  const [maps, setMaps] = useState<Maps>({});

  useEffect(() => {
    ipcRenderer.send("fetch-maps");

    ipcRenderer.on("maps", (event: Event, arg: Maps) => {
      setMaps(arg);
    });
  }, [maps]);

  return (
    <Box display="flex" overflow="hidden" flexGrow={1}>
      <Box flexGrow={1} flexBasis="33%" flexShrink={0} overflow="auto">
        <PackageList />
      </Box>
      <Box flexGrow={2} overflow="auto">
        <PackageInteraction />
      </Box>
    </Box>
  );
};
