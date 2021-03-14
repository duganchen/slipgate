import React, { useState, useEffect } from "react";

import {
  AppBar,
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
import Packages from "../Packages";

//github.com/electron/electron/issues/9920#issuecomment-447157348

import { IpcRenderer } from "electron";

declare global {
  interface Window {
    require: (
      module: "electron"
    ) => {
      ipcRenderer: IpcRenderer;
    };
  }
}

const { ipcRenderer } = window.require("electron");

export const Slipgate = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [exe, setExe] = useState("");
  const [exeError, setExeError] = useState(false);
  const [exeText, setExeText] = useState("");

  const [basedir, setBasedir] = useState("");
  const [basedirError, setBasedirError] = useState(false);
  const [basedirText, setBasedirText] = useState("");

  useEffect(() => {
    ipcRenderer.send("fetch-configuration");

    ipcRenderer.on(
      "configuration",
      (event: any, arg: { exe: string; basedir: string }) => {
        setExe(arg.exe);
        setBasedir(arg.basedir);
      }
    );

    ipcRenderer.on("exe", (event: Event, arg: string) => {
      setExe(arg);
    });

    ipcRenderer.on("exe-text", (event: Event, arg: string) => {
      setExeText(arg);
    });

    ipcRenderer.on("exe-error", (event: Event, arg: boolean) => {
      setExeError(arg);
    });

    ipcRenderer.on("basedir", (event: Event, arg: string) => {
      setBasedir(arg);
    });

    ipcRenderer.on("basedir-text", (event: Event, arg: string) => {
      setBasedirText(arg);
    });

    ipcRenderer.on("basedir-error", (event: Event, arg: boolean) => {
      setBasedirError(arg);
    });
  }, [exe, exeError, exeText, basedir, basedirError, basedirText]);

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
            <TextField
              label="Quake Executable"
              error={exeError}
              value={exe}
              helperText={exeText}
            />
            <Button onClick={() => ipcRenderer.send("browse-exe")}>
              Browse
            </Button>
          </div>
          <div>
            <TextField
              label="Quake Directory"
              error={basedirError}
              value={basedir}
              helperText={basedirText}
            />
            <Button onClick={() => ipcRenderer.send("browse-basedir")}>
              Browse
            </Button>
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
              if (!exeError && !basedirError) {
                ipcRenderer.send("save-configuration", {
                  exe: exe,
                  basedir: basedir,
                });
              }
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
          <FormControlLabel control={<Switch />} label="Sort by rating" />
          <FormControlLabel control={<Switch />} label="Sort by release date" />
        </Toolbar>
      </AppBar>
      <Box flexDirection="column" display="flex" height="100%">
        <Toolbar />
        <Packages />
      </Box>
    </>
  );
};
