import {chmodSync, lstatSync, Stats} from 'fs';
import {traverseDir} from './directory';
import {TStats} from './contract';

export function getStats(path: string): Stats {
  return lstatSync(path);
}

export function isDirectory(path: string, stats?: TStats): boolean {
  return (stats || getStats(path)).isDirectory();
}

export function isSymbolicLink(path: string, stats?: TStats): boolean {
  return (stats || getStats(path)).isSymbolicLink();
}

/**
 * Change permissions of a file.
 *   https://nodejs.org/api/fs.html#file-modes
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
 * For example:
 *   mode 0o740 => "rwx" for owner; "r--" for group; "---" for others
 *   mode 0o600 => "rw-" for owner; "---" for group; "---" for others
 */
export function chmodCyclical(path: string, mode: number, stats?: TStats): void {
  chmodSync(path, mode);
  if (isDirectory(path, stats)) {
    traverseDir(path, {
      callback: args => chmodSync(args.iFilePath, mode),
      maxLevel: Infinity
    });
  }
}
