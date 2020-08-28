import { parseDB } from "../src/dbParser";
import { promises as fs } from "fs";
import * as path from "path";

console.log(__dirname);

test("confirm jest is working", async () => {
  const xmlPromise = await fs.readFile(
    path.join(
      path.dirname(path.dirname(__dirname)),
      "reference",
      "quaddicted_database.xml"
    )
  );
  const xmlData = xmlPromise.toString();
  const mapData = parseDB(xmlData);

  // Randomly check one.
  expect(mapData["warpspasm"]["requirements"][0]).toBe("quoth");
});
