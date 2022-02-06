import {logErr, logSuccess} from '@do-while-for-each/log-node';
import {existsSync, lstatSync, rmSync} from 'fs';

export function removeSync(path: string, showLog?: boolean): boolean {
  if (!existsSync(path)) {
    showLog && logErr('Remove:', `Path doesn't exist: "${path}"`);
    return false;
  }
  rmSync(path, {
    recursive: lstatSync(path).isDirectory(),
    force: false
  });
  if (existsSync(path)) {
    logErr('Remove:', `Unsuccessful attempt to delete "${path}". Perhaps the file is read-only`);
    throw '';
  }
  showLog && logSuccess('Removed:', path);
  return true;
}
