import React, { useState } from "react";
import {
  AppBar,
  Checkbox,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PackageList from "../PackageList";
import Packages from "../Packages";

export const Slipgate = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Dialog
        open={dialogIsOpen}
        onClose={() => {
          setDialogIsOpen(false);
        }}
      >
        <DialogTitle>Configure Slipgate</DialogTitle>
        <DialogContent>
          <div>
            <TextField label="Quake Executable" />
            <Button>Browse</Button>
          </div>
          <div>
            <TextField label="Quake Directory" />
            <Button>Browse</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setDialogIsOpen(false);
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
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
                setDialogIsOpen(true);
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
