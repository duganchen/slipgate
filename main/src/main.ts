import {
  app,
  dialog,
  ipcMain,
  session,
  BrowserWindow,
  Menu,
  MenuItem,
} from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

import { promises as fs } from "fs";
import fetch from "node-fetch";
import { config } from "dotenv";

import { parseDB } from "./dbParser";

import { constants } from "fs";

config();

ipcMain.on("fetch-maps", async (event, arg) => {
  // Update this whenever the file format changes.
  const version = 1;

  await fs.mkdir(`${app.getPath("cache")}/slipgate`, { recursive: true });

  const dbFile = `${app.getPath("cache")}/slipgate/maps.json`;
  const dbUrl = "https://www.quaddicted.com/reviews/quaddicted_database.xml";
  const dateFile = `${app.getPath("cache")}/slipgate/date.txt`;

  let lastModified: Date;

  try {
    const lastStampPromise = await fs.readFile(dateFile);
    lastModified = new Date(lastStampPromise.toString());
  } catch {
    lastModified = new Date(0);
  }

  // https://stackoverflow.com/a/63089060/240515
  const days = 1000606024;
  let daysOld = Math.floor((Number(Date.now()) - Number(lastModified)) / days);

  let dbExists = true;
  try {
    await fs.access(dbFile);
  } catch {
    dbExists = false;
  }

  if (dbExists && daysOld >= 1) {
    console.log("Checking head");
    const headerResponse = await fetch(
      "https://www.quaddicted.com/reviews/quaddicted_database.xml",
      { method: "HEAD" }
    );

    const dateHeader: string = headerResponse.headers.get("date") || "";
    lastModified = new Date(dateHeader);
    await fs.writeFile(dateFile, dateHeader);
    daysOld = Math.floor(Number(Date.now()) - Number(lastModified)) / days;
  }

  if (dbExists && !daysOld) {
    const mapsJSON = await fs.readFile(dbFile);
    const packages = JSON.parse(mapsJSON.toString());

    if (packages.version === version) {
      event.reply("maps", packages.maps);
      return;
    }
  }

  const response = await fetch(dbUrl);
  const xml = await response.text();
  const maps = parseDB(xml, version);

  await fs.writeFile(dbFile, JSON.stringify(maps));
  event.reply("maps", maps);
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    width: 800,
  });

  // and load the index.html of the app.
  if (isDev) {
    const menu = Menu.getApplicationMenu() as Menu;
    menu.append(
      new MenuItem({
        label: "Restart",
        click: () => {
          console.log("We use the click handler");
          app.exit(3);
        },
      })
    );
    Menu.setApplicationMenu(menu);

    const reactPort =
      process.env.REACT_PORT !== undefined ? process.env.REACT_PORT : "3000";

    mainWindow.loadURL(`http://localhost:${reactPort}/`);
  } else {
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.on("browse-exe", async () => {
    const exes = dialog.showOpenDialogSync(mainWindow, {
      title: "Select Quake Executable",
      properties: ["openFile"],
    });

    if (exes === undefined) {
      return;
    }

    mainWindow.webContents.send("exe", exes[0]);

    try {
      await fs.access(exes[0], constants.X_OK);
    } catch {
      mainWindow.webContents.send("exe-error", true);
      mainWindow.webContents.send("exe-text", "File is not executable");
      return;
    }

    mainWindow.webContents.send("exe-error", false);
    mainWindow.webContents.send("exe-text", "");
  });

  ipcMain.on("browse-basedir", async () => {
    const basedirs = dialog.showOpenDialogSync(mainWindow, {
      title: "Select Quake Directory",
      properties: ["openDirectory"],
    });

    if (basedirs === undefined) {
      return;
    }

    mainWindow.webContents.send("basedir", basedirs[0]);

    // Yes, this assumes that the directory is either literally named "id1" or that it's
    // mounted on a case-insensitive filesystem.
    const id1 = `${basedirs[0]}/id1`;
    console.log(id1);

    try {
      const stat = await fs.lstat(id1);
      if (!stat.isDirectory()) {
        mainWindow.webContents.send("basedir-error", true);
        mainWindow.webContents.send("basedir-text", "Not a Quake directory");
      }
    } catch {
      mainWindow.webContents.send("basedir-error", true);
      mainWindow.webContents.send("basedir-text", "Not a Quake directory");
      return;
    }

    try {
      await fs.access(id1, constants.R_OK | constants.X_OK);
    } catch {
      mainWindow.webContents.send("basedir-error", true);
      mainWindow.webContents.send("basedir-text", "Not a Quake directory");
      return;
    }

    mainWindow.webContents.send("basedir-error", false);
    mainWindow.webContents.send("basedir-text", "");
  });
}

ipcMain.on("fetch-configuration", async (event) => {
  const engineConfigurationVersion = 1;
  const confFile = `${app.getPath("cache")}/slipgate/engine.json`;

  // TODO: Add error handling after testing some cases.
  const confBuffer = await fs.readFile(confFile);
  const conf = JSON.parse(confBuffer.toString());

  if (!conf.hasOwnProperty("exe")) {
    return;
  }

  if (!conf.hasOwnProperty("basedir")) {
    return;
  }

  event.reply("configuration", { exe: conf.exe, basedir: conf.basedir });
});

ipcMain.on(
  "save-configuration",
  async (event, arg: { exe: string; basedir: string }) => {
    console.log("Saving configuration");
    const engineConfigurationVersion = 1;
    const confFile = `${app.getPath("cache")}/slipgate/engine.json`;

    await fs.writeFile(
      confFile,
      JSON.stringify({
        version: engineConfigurationVersion,
        exe: arg.exe,
        basedir: arg.basedir,
      })
    );
  }
);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // Use this to load the React Developer Tools.
  if (process.env.DEVTOOLS) {
    await session.defaultSession.loadExtension(process.env.DEVTOOLS);
  }

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
