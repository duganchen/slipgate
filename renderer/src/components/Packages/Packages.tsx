import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import PackageInteraction from "../PackageInteraction";
import PackageList from "../PackageList";
import { Maps, QuakeMap } from "../types";
const { ipcRenderer } = window.require("electron");

export const Packages = () => {
  const [maps, setMaps] = useState<Maps>({});
  const [map, setMap] = useState<QuakeMap | null>(null);

  useEffect(
    () => {
      console.log("fetching maps");
      ipcRenderer.send("fetch-maps");

      ipcRenderer.on("maps", (event: Event, arg: Maps) => {
        setMaps(arg);
      });
    },
    // This gets called in a loop if I put "maps" in the array. Not sure why.
    []
  );

  return (
    <Box display="flex" overflow="hidden" flexGrow={1}>
      <Box flexGrow={1} flexBasis="50%" flexShrink={0} overflow="auto">
        <PackageList maps={Object.values(maps)} setMap={setMap} />
      </Box>
      <Box flexGrow={1} overflow="auto">
        {<PackageInteraction map={map as QuakeMap} />}
      </Box>
    </Box>
  );
};
