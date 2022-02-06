import {logAction, logErr, logOption, logWarn} from '@do-while-for-each/log-node';
import {basename} from 'path';
import {isDirectory} from '../directory';

const title = 'Copy:';

export function err(message: string, showLog?: boolean): void {
  showLog && logErr(title, message);
}

export function warn(message: string, showLog?: boolean): void {
  showLog && logWarn(title, message);
}

export function skipLog(message: string, showLog?: boolean): void {
  showLog && logWarn('Skipped copying:', message);
}

export function copyLog(src: string, dst: string, showLog?: boolean): void {
  if (!showLog)
    return;
  const nameSrc = basename(src);
  const nameDst = basename(dst);
  const name = isDirectory(src) ? 'directory' : 'file';
  logAction(title);
  logOption(name, nameSrc === nameDst ? nameSrc : `${nameSrc} -> ${nameDst}`)
  logOption('src', src);
  logOption('dst', dst);
  console.log(' ');
}
