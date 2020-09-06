import React from "react";
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import { FixedSizeList } from "react-window";
import { AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";

export const PackageList = () => {
  const numbers = [];
  for (let i = 0; i < 3; i++) {
    numbers.push(i);
  }

  const items = numbers.map((item) => (
    <ListItem key={item}>
      <ListItemText primary={`item ${item}`} />
    </ListItem>
  ));
  return <List>{items}</List>;

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: "100%",
  //     height: "100%",
  //   },
  // }));
  // const classes = useStyles();
  // const Row = ({ index, style }) => (
  //   <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
  //     Row {index}
  //   </div>
  // );
  // return (
  //   <Container className={classes.root}>
  //     <AutoSizer>
  //       {({ height, width }) => (
  //         <FixedSizeList
  //           className="List"
  //           height={height}
  //           itemCount={1000}
  //           itemSize={35}
  //           width={width}
  //         >
  //           {Row}
  //         </FixedSizeList>
  //       )}
  //     </AutoSizer>
  //   </Container>
  // );
};
