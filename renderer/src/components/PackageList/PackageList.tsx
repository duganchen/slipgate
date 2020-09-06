import React from "react";
import { Container, List, ListItem } from "@material-ui/core";

export const PackageList = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <div>Item 1</div>
        </ListItem>
        <ListItem>
          <div>Item 2</div>
        </ListItem>
      </List>
    </Container>
  );
};
