import {copyFileSync} from 'fs';
import {basename} from 'path';
import {ICopyOptions} from '../contract';
import {copyLog, warn} from './log';

export function copyFileToFileSync(srcFilePath: string, dstFilePath: string, {showLog, skipSystemFiles, allowedToCopyFilter}: ICopyOptions): number {
  const srcFileName = basename(srcFilePath);
  const dstFileName = basename(dstFilePath);

  if (skipSystemFiles && skipSystemFilesFilter(srcFileName)) {
    warn(`The system file was skipped: ${srcFileName} from "${srcFilePath}"`, showLog);
    return 0;
  }
  if (allowedToCopyFilter && !allowedToCopyFilter(srcFileName, srcFilePath, dstFilePath)) {
    warn(`Skipped a file that isn't allowed to be copied: ${srcFileName} from "${srcFilePath}"`, showLog);
    return 0;
  }

  copyLog(srcFileName, dstFileName, srcFilePath, dstFilePath, showLog);
  copyFileSync(srcFilePath, dstFilePath);
  return 1;
}

export function skipSystemFilesFilter(srcFileName: string): boolean {
  switch (srcFileName) {
    case 'Thumbs.db':
    case '.DS_Store':
      return false;
    default:
      return true;
  }
}
