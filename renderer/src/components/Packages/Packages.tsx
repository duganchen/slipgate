import React from "react";
import { Box } from "@material-ui/core";
import PackageInteraction from "../PackageInteraction";
import PackageList from "../PackageList";

export const Packages = () => {
  return (
    <Box display="flex" overflow="hidden">
      <Box overflow="auto" flexBasis={0} flexGrow={1}>
        <PackageList />
      </Box>

      <Box overflow="auto" flexBasis={0} flexGrow={2}>
        <PackageInteraction />
      </Box>
    </Box>
  );
};
