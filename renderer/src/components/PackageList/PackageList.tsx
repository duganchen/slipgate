import React from "react";
import { Container, ListItem } from "@material-ui/core";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const PackageList = () => {
  const row = (index, style) => {
    return (
      <ListItem style={style}>
        <div>`${index}`</div>
      </ListItem>
    );
  };
  return (
    <Container>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={9999}
              itemSize={1}
            >
              {row}
            </FixedSizeList>
          );
        }}
      </AutoSizer>
    </Container>
  );
};
