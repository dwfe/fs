import {chmodSync, Dirent, existsSync, lstatSync, readdirSync, Stats} from 'fs';
import {logErr} from '@do-while-for-each/log-node';
import {isAbsolute, join} from 'path';
import {ICommonOpt} from './contract';

export function getStats(path: string): Stats {
  return lstatSync(path);
}

export function isDirectory(path: string, stats?: Stats | Dirent): boolean {
  return (stats || getStats(path)).isDirectory();
}

export function isDirectoryOk(path: string, {stats, showLog}: ICommonOpt = {}): boolean {
  const title = 'Directory check:';
  if (!path || !isAbsolute(path) || !existsSync(path)) {
    showLog && logErr(title, `The dir path must be absolute and exist: "${path}"`);
    return false;
  }
  if (!isDirectory(path, stats)) {
    showLog && logErr(title, `The path must point to the directory: "${path}"`);
    return false;
  }
  return true;
}

export function chmodAllCyclical(path: string, mode: number, stats?: Stats | Dirent): void {
  chmodSync(path, mode);
  if (isDirectory(path, stats)) {
    readdirSync(path, {withFileTypes: true}).forEach(dirent => {
      chmodAllCyclical(join(path, dirent.name), mode, dirent);
    });
  }
}
