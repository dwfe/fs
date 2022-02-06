import {lstatSync, Stats} from 'fs';

export function getStats(path: string): Stats {
  return lstatSync(path);
}
