import { app, ipcMain, session, BrowserWindow } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

import { promises as fs } from "fs";
import fetch from "node-fetch";
import * as parser from "fast-xml-parser";
import { config } from "dotenv";

import * as moment from "moment";

config();

interface Requirement {
  id: string;
}

interface Requirements {
  file: Array<Requirement> | Requirement;
}

interface TechInfo {
  zipbasedir?: string;
  commandline?: string;
  requirements?: Requirements;
}

interface QuakeMap {
  rating: string | number;
  size: string | number;
  date: Date | string;
  id: string;
  techinfo?: TechInfo | string;

  zipbasedir?: string;
  commandline?: string;
  startmap?: Array<string>;
}

interface RequirementsList {
  [id: string]: Array<string>;
}

ipcMain.on("fetch-maps", async (event, arg) => {
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

  const xmlPromise = await fs.readFile(dbFile);
  const xml = xmlPromise.toString();
  const dbObj = parser.parse(xml, {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseNodeValue: false,
    parseAttributeValue: false,
  });

  // This is an adjacency list.
  let requirements: RequirementsList = {};

  dbObj["files"]["file"].forEach((quakeMap: QuakeMap) => {
    console.log(quakeMap);
    quakeMap.size = parseInt(quakeMap.size as string, 10);
    quakeMap.date = moment(quakeMap.date, "DD.MM.YY").toDate();
    quakeMap.rating = "⭐".repeat(parseInt(quakeMap.rating as string, 10));

    if ("techinfo" in quakeMap && typeof quakeMap["techinfo"] !== "string") {
      if ("zipbasedir" in quakeMap["techinfo"]) {
        quakeMap["zipbasedir"] = quakeMap["techinfo"]["zipbasedir"];
      }

      if ("commandline" in quakeMap["techinfo"]) {
        quakeMap["commandline"] = quakeMap["techinfo"]["commandline"];
      }
      if ("startmap" in quakeMap["techinfo"]) {
        quakeMap["startmap"] = quakeMap["techinfo"]["startmap"];
      }

      if ("requirements" in quakeMap["techinfo"]) {
        console.log(quakeMap["techinfo"]["requirements"]);
        if (Array.isArray(quakeMap["techinfo"]["requirements"]["file"])) {
          requirements[quakeMap["id"]] = quakeMap["techinfo"]["requirements"][
            "file"
          ].map((m) => m.id);
        } else {
          requirements[quakeMap["id"]] = [
            quakeMap["techinfo"]["requirements"]["file"]["id"],
          ];
        }
      }

      delete quakeMap["techinfo"];
    }
  });

  // event.reply("maps", dbObj["files"]["file"]);
  console.log("Writing maps");
  await fs.writeFile("maps.json", JSON.stringify(dbObj["files"]["file"]));
  await fs.writeFile("requirements.json", JSON.stringify(requirements));
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
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }

  // Open the DevTools.

  mainWindow.webContents.openDevTools();
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
