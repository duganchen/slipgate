import React from "react";
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import { FixedSizeList } from "react-window";
import { AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";

export const PackageList = () => {
  const numbers = [];
  for (let i = 0; i < 99; i++) {
    numbers.push(i);
  }

  const items = numbers.map((item) => (
    <ListItem key={item}>
      <ListItemText primary={`item ${item}`} />
    </ListItem>
  ));

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      height: "100%",
    },
  }));
  const classes = useStyles();
  return <List className={classes.root}>{items}</List>;
};
