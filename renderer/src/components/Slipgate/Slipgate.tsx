import React, { useState } from "react";
import {
  AppBar,
  Checkbox,
  Box,
  FormControlLabel,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Packages from "../Packages";

export const Slipgate = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            keepMounted
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              Configure
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              Reload Database
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              Exit
            </MenuItem>
          </Menu>
          <Input type="search" placeholder="filter" />
          <FormControlLabel control={<Switch />} label="Installed Only" />
          <FormControlLabel control={<Checkbox />} label="Sort by rating" />
          <FormControlLabel
            control={<Checkbox />}
            label="Sort by release date"
          />
        </Toolbar>
      </AppBar>
      <Box flexDirection="column" display="flex" height="100%">
        <Toolbar />
        <Packages />
      </Box>
    </>
  );
};
