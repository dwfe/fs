import {logAction, logErr, logOption, logWarn} from '@do-while-for-each/log-node';
import {dirname} from 'path';

export function err(message: string, showLog?: boolean): void {
  showLog && logErr('Copy sync:', message);
}

export function warn(message: string, showLog?: boolean): void {
  showLog && logWarn('Copy sync:', message);
}

export function copyLog(nameSrc: string, nameDst: string, src: string, dst: string, showLog?: boolean): void {
  if (!showLog)
    return;
  logAction('Copy:');
  logOption('name', nameSrc === nameDst ? nameSrc : `${nameSrc} -> ${nameDst}`)
  logOption('src', dirname(src));
  logOption('dst', dirname(dst));
  console.log(' ');
}
