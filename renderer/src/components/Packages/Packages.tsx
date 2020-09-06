import React from "react";
import { Box } from "@material-ui/core";
import PackageInteraction from "../PackageInteraction";
import PackageList from "../PackageList";

export const Packages = () => {
  return (
    <Box display="flex" overflow="hidden" flexGrow={1}>
      <Box flexGrow={1} flexBasis="33%" flexShrink={0} overflow="auto">
        <PackageList />
      </Box>
      <Box flexGrow={2}>
        <PackageInteraction />
      </Box>
    </Box>
  );
};
