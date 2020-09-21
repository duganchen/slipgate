export interface Maps {
  [index: string]: { requirements: string[] };
}

const getUrls = function (
  map: string,
  maps: Maps,
  requirements: { [index: string]: string }
) {
  if (!maps.hasOwnProperty(map)) {
    return;
  }

  requirements[map] = `https://www.quaddicted.com/filebase/${map}.zip`;

  for (const requirement of maps[map].requirements) {
    if (!requirements.hasOwnProperty(requirement))
      getUrls(requirement, maps, requirements);
  }
};

export const getPackageLinks = function (
  map: string,
  maps: Maps
): { [index: string]: string } {
  const requirements = {};
  getUrls(map, maps, requirements);
  return requirements;
};

// /home/dugan/Software/vkQuake/Quake/vkquake -basedir /storage/quake

export const getCommandLine = function (
  engine: { exe: string; basedir: string },
  map: { commandline?: string },
  startmap?: string
): string[] {
  const argv = [engine.exe, "-basedir", engine.basedir];

  if (map.hasOwnProperty("commandline")) {
    argv.push(...(map.commandline as string).split(" "));
  }

  if (startmap !== undefined) {
    argv.push("+map");
    argv.push(startmap);
  }

  return argv;
};
