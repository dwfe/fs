import {logAction, logErr, logOption, logWarn} from '@do-while-for-each/log-node';
import {dirname} from 'path';

export function err(message: string): void {
  logErr('Copy sync:', message);
}

export function warn(message: string): void {
  logWarn('Copy sync:', message);
}

export function copyLog(nameSrc: string, nameDst: string, src: string, dst: string): void {
  logAction('Copy:');
  logOption('name', nameSrc === nameDst ? nameSrc : `${nameSrc} -> ${nameDst}`)
  logOption('src', dirname(src));
  logOption('dst', dirname(dst));
  console.log(' ');
}
