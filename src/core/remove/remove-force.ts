import {existsSync} from 'fs';
import {IRemoveOptions} from '../contract';
import {removeSync} from './remove-sync';
import {chmodCyclical} from '../common';
import {err, success} from './log';

export function removeForce(path: string, {stats, showLog}: IRemoveOptions) {
  removeSync(path, {force: true, stats});
  if (existsSync(path)) {
    const mode = 0o600;
    chmodCyclical(path, mode);
    removeSync(path, {force: true});
    if (existsSync(path)) {
      err(`Unsuccessful attempt to remove after cyclical chmod to ${mode}: "${path}"`, true);
      throw '';
    }
  }
  showLog && success(path, showLog);
}
