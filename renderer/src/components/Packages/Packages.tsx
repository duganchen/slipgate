import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import PackageInteraction from "../PackageInteraction";
import PackageList from "../PackageList";
import { Maps, QuakeMap } from "../types";

// https://github.com/electron/electron/issues/9920#issuecomment-447157348

import { IpcRenderer } from "electron";

declare global {
  interface Window {
    require: (
      module: "electron"
    ) => {
      ipcRenderer: IpcRenderer;
    };
  }
}

const { ipcRenderer } = window.require("electron");

export const Packages = () => {
  const [maps, setMaps] = useState<Maps>({});
  const [map, setMap] = useState<QuakeMap>({
    id: "",
    type: "",
    label: "",
    rating: "",
    authors: [],
    title: "",
    md5sum: "",
    size: 0,
    date: new Date(),
    description: "",
    zipbasedir: "",
    commandline: "",
    startmap: [],
    requirements: [],
    secondary: "",
  });

  useEffect(() => {
    console.log("fetching maps");
    ipcRenderer.send("fetch-maps");

    ipcRenderer.on("maps", (event: Event, arg: Maps) => {
      setMaps(arg);
    });
  }, []);

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
