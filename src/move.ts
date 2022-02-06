import {logAction, logOption} from '@do-while-for-each/log-node';
import {ICopyOptions} from './contract';
import {remove} from './remove/remove';
import {copy} from './copy/copy';

export function move(src: string, dst: string, opt: ICopyOptions = {}): void {
  const {showLog} = opt;
  copy(src, dst, opt);
  remove(src, showLog);
  moveLog(src, dst, showLog);
}

function moveLog(src: string, dst: string, showLog?: boolean): void {
  if (!showLog)
    return;
  logAction('Moved:');
  logOption('src', src);
  logOption('dst', dst);
  console.log(' ');
}
