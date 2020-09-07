import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { FixedSizeList } from "react-window";
import { AutoSizer } from "react-virtualized";
import PackageItem from "../PackageItem";

export const PackageList = () => {
  // This is the "height" in the inspector if you don't use react-window.
  // Good?
  const itemHeight = 72;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={10000}
          itemSize={itemHeight}
          width={width}
        >
          {({ index, style }) => (
            <PackageItem key={index} style={style} primary={`Row ${index}`} />
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
