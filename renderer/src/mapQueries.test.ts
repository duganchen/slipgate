import { getPackageLinks, getCommandLine } from "../src/mapQueries";

test("Test the map queries", () => {
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

test("Test command-line generation for a single BSP", () => {
  expect(
    getCommandLine(
      { exe: "/path/to/engine", basedir: "/path/to/basedir" },
      {},
      "firedice"
    )
  ).toEqual([
    "/path/to/engine",
    "-basedir",
    "/path/to/basedir",
    "+map",
    "firedice",
  ]);
});

test("Test command-line generation for a partial conversion", () => {
  expect(
    getCommandLine(
      { exe: "/path/to/engine", basedir: "/path/to/basedir" },
      { commandline: "-game 1000cuts" }
    )
  ).toEqual([
    "/path/to/engine",
    "-basedir",
    "/path/to/basedir",
    "-game",
    "1000cuts",
  ]);
});
