import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

import { promises as fs } from "fs";
import fetch from "node-fetch";

const downloadDB = async () => {
  const dbFile = `${app.getPath("cache")}/slipgate/quaddicted_database.xml`;
  const dbUrl = "https://www.quaddicted.com/reviews/quaddicted_database.xml";
  const dateFile = `${app.getPath("cache")}/slipgate/date.txt`;

  await fs.mkdir(`${app.getPath("cache")}/slipgate`, { recursive: true });

  let lastModified: Date;

  try {
    const lastStampPromise = await fs.readFile(dateFile);
    lastModified = new Date(lastStampPromise.toString());
  } catch {
    lastModified = new Date(0);
  }

  const headerResponse = await fetch(
    "https://www.quaddicted.com/reviews/quaddicted_database.xml",
    { method: "HEAD" }
  );
  const dateHeader: string = headerResponse.headers.get("date") || "";
  const upstreamModified = new Date(dateHeader);

  console.log("Writing date to " + dateFile);
  await fs.writeFile(dateFile, dateHeader);

  let dbExists = true;
  try {
    await fs.access(dbFile);
  } catch {
    dbExists = false;
  }

  if (lastModified < upstreamModified || !dbExists) {
    const response = await fetch(dbUrl);
    const xml = await response.text();
    await fs.writeFile(dbFile, xml);
  }
};
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
    mainWindow.loadURL("http://localhost:3000");
  } else {
    console.log(path.join(__dirname, "index.html"));
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  downloadDB();

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
