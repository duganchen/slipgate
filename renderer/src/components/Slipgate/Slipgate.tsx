import React from "react";
import {
  AppBar,
  Checkbox,
  Box,
  FormControlLabel,
  IconButton,
  Input,
  Switch,
  Toolbar,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Packages from "../Packages";

export const Slipgate = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton>
            <Menu />
            <Input type="search" placeholder="filter" />
            <FormControlLabel control={<Switch />} label="Installed Only" />
            <FormControlLabel control={<Checkbox />} label="Sort by rating" />
            <FormControlLabel
              control={<Checkbox />}
              label="Sort by release date"
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box flexDirection="column" display="flex" height="100%">
        <Toolbar />
        <Packages />
      </Box>
    </>
  );
};
