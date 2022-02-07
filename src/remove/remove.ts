import {existsSync, rmSync} from 'fs';
import {isAbsolute} from 'path';
import {chmodAllCyclical} from '../common';
import {isDirectory} from '../directory';
import {err, success, warn} from './log';

export function remove(path: string, showLog?: boolean): boolean {
  validateParams(path);
  removeSync(path)
  if (existsSync(path)) {
    const mode = 0o666; // https://nodejs.org/api/fs.html#file-modes
    chmodAllCyclical(path, mode);
    removeSync(path);
    if (existsSync(path)) {
      err(`Unsuccessful attempt to remove "${path}" after chmod to ${mode}`, true);
      throw '';
    }
    success(path, showLog);
  } else
    warn(`The path to remove is already not exist: "${path}"`);
  return true;
}

function removeSync(path: string): void {
  rmSync(path, {
    recursive: isDirectory(path),
    force: true
  });
}

function validateParams(path: string): void {
  if (!path || !isAbsolute(path)) {
    err(`The path must be absolute: "${path}"`, true);
    throw '';
  }
  if (!existsSync(path)) {
    err(`Path doesn't exist: "${path}"`, true);
    throw '';
  }
}

