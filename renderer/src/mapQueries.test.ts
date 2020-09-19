import { getUrls } from "../src/mapQueries";
import { promises as fs } from "fs";
import * as path from "path";

test("Test the map queries", async () => {
  const mapsJSON = await fs.readFile(
    path.join(path.dirname(path.dirname(__dirname)), "reference", "maps.json")
  );
  const maps = JSON.parse(mapsJSON.toString());
  const requirements = {};
  getUrls("fort_driant-fullvis", maps, requirements);

  expect(requirements).toMatchObject({
    "fort_driant-fullvis":
      "https://www.quaddicted.com/filebase/fort_driant-fullvis.zip",
    quoth: "https://www.quaddicted.com/filebase/quoth.zip",
    fort_driant: "https://www.quaddicted.com/filebase/fort_driant.zip",
  });
});
export {};
