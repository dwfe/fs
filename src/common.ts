import {chmodSync, lstatSync, readdirSync, Stats} from 'fs';
import {join} from 'path';
import {isDirectory} from './directory';

export function getStats(path: string): Stats {
  return lstatSync(path);
}

export function chmodAllCyclical(path: string, mode: number): void {
  chmodSync(path, mode);
  if (isDirectory(path)) {
    readdirSync(path).forEach(fileName => {
      chmodAllCyclical(join(path, fileName), mode);
    });
  }
}
