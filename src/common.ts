import {existsSync, lstatSync, rmSync} from 'fs';
import {logErr, logSuccess} from '@do-while-for-each/log-node';

export function removeSync(path: string, showLog?: boolean): boolean {
  if (!existsSync(path)) {
    showLog && logErr('Remove:', `Path doesn't exist: "${path}"`);
    return false;
  }
  rmSync(path, {
    recursive: lstatSync(path).isDirectory(),
    force: true
  })
  showLog && logSuccess('Removed:', path);
  return true;
}
