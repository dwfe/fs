import {logAction, logOption} from '@do-while-for-each/log-node';
import {copySync, ICopySyncOptions} from './copy-sync';
import {removeSync} from './remove-sync';

export function moveSync(src: string, dst: string, opt?: ICopySyncOptions): void {
  copySync(src, dst, opt);
  removeSync(src, opt?.showLog);
  opt?.showLog && moveLog(src, dst);
}

function moveLog(src: string, dst: string): void {
  logAction('Moved:');
  logOption('src', src);
  logOption('dst', dst);
  console.log(' ');
}
