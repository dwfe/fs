import {logErr, logSuccess} from '@do-while-for-each/log-node';
import {existsSync, lstatSync, rmSync} from 'fs';
import {isAbsolute} from 'path';

export function removeSync(path: string, showLog?: boolean): boolean {
  validateParams(path);
  rmSync(path, {
    recursive: lstatSync(path).isDirectory(),
    force: false
  });
  if (existsSync(path)) {
    err(`Unsuccessful attempt to remove "${path}". Perhaps the file is read-only`);
    throw '';
  }
  showLog && logSuccess('Removed:', path);
  return true;
}


function validateParams(path: string): void {
  if (!path || !isAbsolute(path)) {
    err(`The path must be absolute: "${path}"`);
    throw '';
  }
  if (!existsSync(path)) {
    err(`Path doesn't exist: "${path}"`);
    throw '';
  }
}

function err(message: string): void {
  logErr('Remove:', message);
}
