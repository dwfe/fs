import {existsSync, lstatSync, rmSync} from 'fs';

export function removeSync(path: string): boolean {
  if (!existsSync(path))
    return false;
  rmSync(path, {
    recursive: lstatSync(path).isDirectory(),
    force: true
  })
  return true;
}
