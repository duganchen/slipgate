import React from "react";
import { Box } from "@material-ui/core";
// import PackageInteraction from "../PackageInteraction";
import PackageList from "../PackageList";

export const Packages = () => {
  return (
    // <Box display="flex" overflow="hidden">
    //   <Box overflow="auto" flexBasis={0} flexGrow={1}>
    //     <PackageList />
    //   </Box>

    //   <Box overflow="auto" flexBasis={0} flexGrow={2}>
    //     <PackageInteraction />
    //   </Box>
    // </Box>

    <Box display="flex" overflow="hidden" flexGrow={1}>
      <Box flexGrow={1} display="flex" flexDirection="row">
        <Box flexGrow={1} overflow="auto">
          <PackageList />
        </Box>
        <Box flexGrow={2}>
          <p>Column 2</p>
        </Box>
      </Box>
    </Box>
  );
};
