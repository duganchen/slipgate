import { parseDB } from "../src/dbParser";
import { promises as fs } from "fs";
import * as path from "path";

test("confirm jest is working", async () => {
  const xmlPromise = await fs.readFile(
    path.join(
      path.dirname(path.dirname(__dirname)),
      "reference",
      "quaddicted_database.xml"
    )
  );
  const xmlData = xmlPromise.toString();
  const packages = parseDB(xmlData, 1);

  // Randomly check one.
  expect(packages["maps"]["warpspasm"]["requirements"][0]).toBe("quoth");
});
