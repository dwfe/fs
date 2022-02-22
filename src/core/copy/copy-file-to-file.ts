import {copyFileSync} from 'fs';
import {basename} from 'path';
import {copyLog, skipLog} from './log';
import {ICopyOpt} from '../contract';

export function copyFileToFile(srcFilePath: string, dstFilePath: string, opt: ICopyOpt): number {
  const srcFileName = basename(srcFilePath);
  const {showLog, skipSystemFiles, allowedToCopyFilter} = opt;

  if (skipSystemFiles && skipSystemFilesFilter(srcFileName)) {
    skipLog(`The system file: ${srcFileName} from "${srcFilePath}"`, showLog);
    return 0;
  }
  if (allowedToCopyFilter && !allowedToCopyFilter({
    iSrcFileName: srcFileName,
    iSrcFilePath: srcFilePath,
    iDstFilePath: dstFilePath,
    iStats: opt.stats
  })) {
    skipLog(`allowedToCopyFilter: ${srcFileName} from "${srcFilePath}"`, showLog);
    return 0;
  }
  copyLog(srcFilePath, dstFilePath, opt);
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
