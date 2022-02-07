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

/**
 * Change permissions of a file,
 * https://nodejs.org/api/fs.html#file-modes
 *
 * Numbers in the octal number system and their corresponding access rights:
 *   0 = ---
 *   1 = --x
 *   2 = -w-
 *   3 = -wx
 *   4 = r--
 *   5 = r-x
 *   6 = rw-
 *   7 = rwx
 *
 * The position of the octal number and its corresponding access group:
 *   First = owner
 *   Second = group
 *   Third = others
 *
 * E.g.:
 *   0o740 = "rwx" for owner; "r--" for group; "---" for others
 *   0o600 = "rw-" for owner; "---" for group; "---" for others
 */
export function chmodAllCyclical(path: string, mode: number, stats?: Stats | Dirent): void {
  chmodSync(path, mode);
  if (isDirectory(path, stats)) {
    readdirSync(path, {withFileTypes: true}).forEach(stats => {
      chmodAllCyclical(join(path, stats.name), mode, stats);
    });
  }
}
