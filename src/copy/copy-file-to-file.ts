import {copyFileSync} from 'fs';
import {basename} from 'path';
import {ICopyOptions} from '../contract';
import {copyLog, skipLog} from './log';

export function copyFileToFile(srcFilePath: string, dstFilePath: string, {showLog, skipSystemFiles, allowedToCopyFilter}: ICopyOptions): number {
  const srcFileName = basename(srcFilePath);

  if (skipSystemFiles && skipSystemFilesFilter(srcFileName)) {
    skipLog(`The system file: ${srcFileName} from "${srcFilePath}"`, showLog);
    return 0;
  }
  if (allowedToCopyFilter && !allowedToCopyFilter(srcFileName, srcFilePath, dstFilePath)) {
    skipLog(`allowedToCopyFilter: ${srcFileName} from "${srcFilePath}"`, showLog);
    return 0;
  }

  copyLog(srcFilePath, dstFilePath, showLog);
  copyFileSync(srcFilePath, dstFilePath);
  return 1;
}

export function skipSystemFilesFilter(srcFileName: string): boolean {
  switch (srcFileName) {
    case 'Thumbs.db':
    case '.DS_Store':
      return true;
    default:
      return false;
  }
}
