import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { QuakeMap } from "../types";

export const PackageInteraction = (props: { map: QuakeMap }) => {
  const [startMap, setStartMap] = useState("");

  const startMaps = props.map.startmap.map((startMap) => (
    <MenuItem key={startMap} value={startMap}>
      {startMap}
    </MenuItem>
  ));

  if (!props.map.startmap.length && startMap !== "") {
    setStartMap("");
  }

  if (props.map.startmap.length && startMap !== props.map.startmap[0]) {
    setStartMap(props.map.startmap[0]);
  }

  return (
    <Container>
      <img
        src={`https://www.quaddicted.com/reviews/screenshots/${props.map.id}_thumb.jpg`}
        width="500"
        height="375"
        alt={`Screenshot of ${props.map.id}`}
      />
      <div dangerouslySetInnerHTML={{ __html: props.map.description }} />

      <Select
        value={startMap}
        onChange={(event) => {
          console.log(event.target.value);
          setStartMap(event.target.value as string);
        }}
      >
        {startMaps}
      </Select>
      <Button>Launch!</Button>
    </Container>
  );
};
