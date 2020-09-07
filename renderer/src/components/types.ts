export interface QuakeMap {
  id: string;
  type: string;
  label: string;
  rating: number | null;
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

export interface Maps {
  [id: string]: QuakeMap;
}
