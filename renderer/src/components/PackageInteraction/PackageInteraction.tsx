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

  const startMaps = props.map.startmap.map(startMap => <MenuItem key={startMap}>{startMap}</MenuItem>);

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
        {startMaps}
      </Select>
      <Button>Launch!</Button>
    </Container>
  );
};
