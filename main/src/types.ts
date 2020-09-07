interface ParsedRequirement {
  id: string;
}

interface ParsedRequirements {
  file: ParsedRequirement | ParsedRequirement[];
}

interface ParsedTechInfo {
  zipbasedir: string;
  commandline: string;
  startmap?: string | Array<string>;
  requirements?: ParsedRequirements;
}

interface ParsedMap {
  id: string;
  type: string;
  rating: string;
  author: string;
  title: string;
  md5sum: string;
  size: string;
  date: string;
  description: string;
  techinfo: ParsedTechInfo;
}

interface QuakeMap {
  id: string;
  type: string;
  label: string;
  rating: string | null;
  author: string;
  authors: string[];
  title: string;
  md5sum: string;
  size: number;
  date: Date;
  description: string;
  zipbasedir: string;
  commandline: string;
  startmap: Array<string>;
  requirements: Array<string>;
}

interface Maps {
  [id: string]: QuakeMap;
}

export { ParsedMap, ParsedRequirements, Maps, QuakeMap };
