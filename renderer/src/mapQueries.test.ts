import { getPackageLinks } from "../src/mapQueries";

test("Test the map queries", async () => {
  const maps = {
    "fort_driant-fullvis": { requirements: ["quoth", "fort_driant"] },
    quoth: { requirements: [] as string[] },
    fort_driant: { requirements: ["quoth"] },
  };

  const requirements = getPackageLinks("fort_driant-fullvis", maps);

  expect(requirements).toMatchObject({
    "fort_driant-fullvis":
      "https://www.quaddicted.com/filebase/fort_driant-fullvis.zip",
    quoth: "https://www.quaddicted.com/filebase/quoth.zip",
    fort_driant: "https://www.quaddicted.com/filebase/fort_driant.zip",
  });
});
