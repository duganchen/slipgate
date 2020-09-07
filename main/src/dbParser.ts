import * as parser from "fast-xml-parser";
import * as moment from "moment";
import { ParsedMap, Maps, ParsedRequirements } from "./types";

const parseDB = (xmlData: string) => {
  const dbObj = parser.parse(xmlData, {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseNodeValue: false,
    parseAttributeValue: false,
  });

  let maps: Maps = {};
  dbObj["files"]["file"].forEach((parsedMap: ParsedMap) => {
    maps[parsedMap.id] = {
      id: parsedMap.id,
      type:
        parsedMap.type === "1" ? "Single BSP File(s)" : "Partial conversion",
      rating: "⭐".repeat(parseInt(parsedMap.rating as string, 10)),
      label: `${parsedMap.id}.zip - ${parsedMap.title}`,
      md5sum: parsedMap.md5sum,
      title: parsedMap.title,
      size: parseInt(parsedMap.size, 10),
      date: moment(parsedMap.date, "DD.MM.YY").toDate(),
      description: parsedMap.description,
      startmap: [],
      requirements: [],
      author: parsedMap.author,
      authors: parsedMap.author.split(",").map((s) => s.trim()),
      zipbasedir: parsedMap.techinfo.zipbasedir,
      commandline: parsedMap.techinfo.commandline,
      filename: `${parsedMap.id}.zip`,
    };

    if (parsedMap.techinfo.hasOwnProperty("startmap")) {
      if (Array.isArray(parsedMap.techinfo.startmap)) {
        maps[parsedMap.id].startmap = parsedMap.techinfo.startmap;
      } else {
        maps[parsedMap.id].startmap = [parsedMap.techinfo.startmap as string];
      }
    }

    if (parsedMap.techinfo.hasOwnProperty("requirements")) {
      const requirements = parsedMap.techinfo
        .requirements as ParsedRequirements;
      if (Array.isArray(requirements.file)) {
        maps[parsedMap.id].requirements = requirements.file.map((m) => m.id);
      } else {
        maps[parsedMap.id].requirements = [requirements.file.id];
      }
    }
  });

  return maps;
};

export { parseDB };
