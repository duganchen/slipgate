import React from "react";
import { Container, List, ListItem } from "@material-ui/core";

export const PackageList = () => {
  let numbers = [];
  for (let i = 0; i < 10000; i++) {
    numbers.push(<ListItem>`item {i}`</ListItem>);
  }
  return (
    <Container>
      <List>{numbers}</List>
    </Container>
  );
};
