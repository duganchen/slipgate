export interface QuakeMap {
  id: string;
  type: string;
  label: string;
  rating: string | null;
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
  secondary: string;
}

export interface Maps {
  [id: string]: QuakeMap;
}
