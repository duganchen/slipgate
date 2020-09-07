import React from "react";
import { FixedSizeList } from "react-window";
import { AutoSizer } from "react-virtualized";
import PackageItem from "../PackageItem";
import { QuakeMap } from "../types";

export const PackageList = (props: { maps: QuakeMap[] }) => {
  // This is the "height" in the inspector if you don't use react-window.
  // Good?
  const itemHeight = 72;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={props.maps.length}
          itemSize={itemHeight}
          width={width}
        >
          {({ index, style }) => (
            <PackageItem key={index} style={style} map={props.maps[index]} />
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
