import {logAction, logOption} from '@do-while-for-each/log-node';
import {ICopyOpt} from './contract';
import {copy} from './copy/copy';
import {removeForce} from './remove/remove-force';

export function move(src: string, dst: string, opt: ICopyOpt = {}): void {
  const {showLog} = opt;
  copy(src, dst, opt);
  removeForce(src, {showLog});
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
