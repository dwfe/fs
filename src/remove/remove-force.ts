import {existsSync} from 'fs';
import {chmodAllCyclical} from '../common';
import {IRemoveOptions} from '../contract';
import {removeSync} from './remove-sync';
import {err, success} from './log';

export function removeForce(path: string, {stats, showLog}: IRemoveOptions) {
  removeSync(path, {force: true, stats});
  if (existsSync(path)) {
    const mode = 0o666; // https://nodejs.org/api/fs.html#file-modes
    chmodAllCyclical(path, mode);
    removeSync(path, {force: true});
    if (existsSync(path)) {
      err(`Unsuccessful attempt to remove after cyclical chmod to ${mode}: "${path}"`, true);
      throw '';
    }
  }
  showLog && success(path);
}
