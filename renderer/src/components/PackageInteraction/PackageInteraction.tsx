import React from "react";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { QuakeMap } from "../types"

export const PackageInteraction = (props: { map: QuakeMap }) => {
  if (!props.map) {
    return <div />
  }

  return (
    <Container>
      <img
        src={`https://www.quaddicted.com/reviews/screenshots/${props.map.id}_thumb.jpg`}
        width="500"
        height="375"
        alt={`Screenshot of ${props.map.id}`}
      />
      <div dangerouslySetInnerHTML={{ __html: props.map.description }}/>

      <Select>
        <MenuItem>map01</MenuItem>
      </Select>
      <Button>Launch!</Button>
      <TextField inputProps={{ readOnly: true }}></TextField>
    </Container>
  );
};
