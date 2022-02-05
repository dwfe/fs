import {existsSync, rmSync} from 'fs'
import {isDirectory} from './directory'

export function removeSync(path: string): boolean {
  if (!existsSync(path))
    return false;
  rmSync(path, {
    recursive: isDirectory(path),
    force: true
  })
  return true;
}
