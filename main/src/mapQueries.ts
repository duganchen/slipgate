import { Maps } from "./types";

export const getUrls = function (
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

export {};
