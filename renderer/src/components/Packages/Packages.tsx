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
    <Box display="flex" flexGrow={1}>
      <Box flexGrow={1} flexBasis="50%" flexShrink={0}>
        <PackageList maps={Object.values(maps)} />
      </Box>
      <Box flexGrow={1} overflow="auto">
        <PackageInteraction />
      </Box>
    </Box>
  );
};
