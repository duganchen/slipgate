import React from "react";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { QuakeMap } from "../types"

export const PackageInteraction = (props: {map: QuakeMap}) => {
  return (
    <Container>
      <img
        src="https://www.quaddicted.com/reviews/screenshots/mhsp01_thumb.jpg"
        width="500"
        height="375"
        alt="Screenshot of mhsp01"
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero
        volutpat sed cras ornare arcu dui vivamus. Tristique sollicitudin nibh
        sit amet commodo nulla facilisi nullam. Purus faucibus ornare
        suspendisse sed nisi lacus sed viverra tellus. Condimentum vitae sapien
        pellentesque habitant morbi tristique senectus et. Ligula ullamcorper
        malesuada proin libero nunc. Malesuada bibendum arcu vitae elementum
        curabitur. At lectus urna duis convallis convallis. Ultricies mi eget
        mauris pharetra. Ante metus dictum at tempor commodo. Tincidunt dui ut
        ornare lectus sit amet est placerat. Morbi tristique senectus et netus
        et malesuada. Auctor augue mauris augue neque gravida in fermentum et.
        Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Nunc
        congue nisi vitae suscipit tellus mauris.
      </p>
      <Select>
        <MenuItem>map01</MenuItem>
      </Select>
      <Button>Launch!</Button>
      <TextField inputProps={{ readOnly: true }}></TextField>
    </Container>
  );
};
