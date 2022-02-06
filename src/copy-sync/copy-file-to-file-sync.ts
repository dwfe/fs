import {copyFileSync} from 'fs';
import {basename} from 'path';
import {ICopyOptions} from '../contract';
import {copyLog} from './log';

export function copyFileToFileSync(srcFilePath: string, dstFilePath: string, {showLog}: ICopyOptions): number {
  showLog && copyLog(basename(srcFilePath), basename(dstFilePath), srcFilePath, dstFilePath);
  copyFileSync(srcFilePath, dstFilePath);
  return 1;
}
