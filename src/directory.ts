import {existsSync, lstatSync,  readdirSync, rmSync} from 'fs';
import {join} from 'path';

export function isDirectory(path: string): boolean {
  return lstatSync(path).isDirectory();
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
