import {existsSync, lstatSync, mkdirSync, readdirSync, rmSync} from 'fs';
import {join} from 'path';

export function isDirectory(path: string): boolean {
  return lstatSync(path).isDirectory();
}

/**
 * Returns:
 *   false - path exists and it is a File;
 *   true  - path exists and it is a Directory.
 *
 */
export function ensureDir(path: string, onCreateDir?: () => void): boolean {
  if (existsSync(path))
    return isDirectory(path);
  mkdirSync(path);
  onCreateDir?.();
  return true;
}

export function cleanDir(path: string): void {
  if (!existsSync(path) || !isDirectory(path))
    return;
  readdirSync(path)
    .map(fileName => join(path, fileName))
    .forEach(filePath =>
      rmSync(filePath, {
        recursive: isDirectory(filePath),
        force: true
      })
    );
}
