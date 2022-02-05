import {existsSync, lstatSync, mkdirSync, readdirSync, rmSync} from 'fs';
import {logErr} from '@do-while-for-each/log-node';
import {join} from 'path';

export function isDirectory(path: string): boolean {
  return lstatSync(path).isDirectory();
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

export function cleanDir(path: string): void {
  if (!existsSync(path)) {
    logErr('Clean dir:', `Path "${path}" doesn't exist`);
    return;
  }
  if (!isDirectory(path)) {
    logErr('Clean dir:', `Path "${path}" is not a dir`);
    return;
  }
  readdirSync(path)
    .map(fileName => join(path, fileName))
    .forEach(filePath =>
      rmSync(filePath, {
        recursive: isDirectory(filePath),
        force: true
      })
    );
}
