import { app, ipcMain, session, BrowserWindow, Menu, MenuItem } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

import { promises as fs } from "fs";
import fetch from "node-fetch";
import * as parser from "fast-xml-parser";
import { config } from "dotenv";

import * as moment from "moment";
import { parseDB } from "./dbParser";
import { allowedNodeEnvironmentFlags } from "process";

import * as Ajv from "ajv";

config();

ipcMain.on("fetch-maps", async (event, arg) => {
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

  const schemaJSON = await fs.readFile("../reference/maps.schema");
  const schema = JSON.parse(schemaJSON.toString());
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  let valid;

  if (dbExists && !daysOld) {
    const mapsJSON = await fs.readFile(dbFile);
    const mapData = JSON.parse(mapsJSON.toString());
    valid = validate(mapData);

    if (valid) {
      event.reply("maps", mapData);
      return;
    } else {
      console.log(validate.errors);
    }
  }

  const response = await fetch(dbUrl);
  const xml = await response.text();
  const maps = parseDB(xml);

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
  // mainWindow.webContents.openDevTools();
}

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
