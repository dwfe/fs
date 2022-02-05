import {existsSync, lstatSync, mkdirSync, readdirSync, rmSync} from 'fs';
import {logErr} from '@do-while-for-each/log-node';
import {join} from 'path';

export function isDirectory(path: string): boolean {
  return lstatSync(path).isDirectory();
}

export function isDirectoryOk(path: string, needToLog?: boolean): boolean {
  const title = 'Directory check:';
  if (!existsSync(path)) {
    needToLog && logErr(title, `Path "${path}" doesn't exist`);
    return false;
  }
  if (!isDirectory(path)) {
    needToLog && logErr(title, `Path "${path}" is not a dir`);
    return false;
  }
  return true;
}

/**
 * Make sure the directory exists.
 * @Returns:
 *   true  - directory exists;
 *   false - path exists and it is a file;
 */
export function ensureDirExists(path: string, afterCreatingDir?: () => void): boolean {
  if (existsSync(path))
    return isDirectory(path);
  mkdirSync(path);
  afterCreatingDir?.();
  return true;
}

export function cleanDir(path: string, needToLog?: boolean): boolean {
  if (!isDirectoryOk(path, needToLog))
    return false;
  readdirSync(path)
    .map(fileName => join(path, fileName))
    .forEach(filePath =>
      rmSync(filePath, {
        recursive: isDirectory(filePath),
        force: true
      })
    );
  return true;
}
