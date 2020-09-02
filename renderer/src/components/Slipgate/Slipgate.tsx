import React from "react";
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
  const [anchorEl, setAnchorEl] = React.useState<EventTarget | null>(null);

  const open = Boolean(anchorEl);
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.target);
            }}
          >
            <MenuIcon />
            <Menu open={open}>
              <MenuItem>Configure</MenuItem>
              <MenuItem>Reload Database</MenuItem>
              <MenuItem>Exit</MenuItem>
            </Menu>
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
