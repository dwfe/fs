import {readdirSync} from 'fs';
import {basename, join} from 'path';
import {ensureDirExists, isDirectory, isDirectoryOk} from '../directory';
import {copyFileToFileSync} from './copy-file-to-file-sync';
import {ICopyOptions} from '../contract';
import {copyLog, err} from './log';

export function copySrcDir(src: string, dst: string, opt: ICopyOptions) {
  if (!ensureDirExists(dst)) {
    err(`Can't copy src dir "${src}" to dst file "${dst}"`);
    throw '';
  }
  let count = 0;
  const dirNameSrc = basename(src);
  const dirNameDst = basename(dst);
  const {showLog, skipSystemFiles, allowedToCopyFilter} = opt;

  if (dirNameSrc === dirNameDst) {
    count = 1; // copied src dir itself
    showLog && copyLog(dirNameSrc, dirNameDst, src, dst);
  }

  let fileNames = readdirSync(src);
  if (allowedToCopyFilter)
    fileNames = fileNames.filter((fileName) => allowedToCopyFilter(fileName, src, dst));
  if (skipSystemFiles)
    fileNames = fileNames.filter((fileName) => skipSystemFilesFilter(fileName));
  fileNames.forEach(fileName => {
    const iSrc = join(src, fileName);
    const iDst = join(dst, fileName);
    if (isDirectory(iSrc)) {
      count += copySrcDir(iSrc, iDst, opt);
      return;
    } else if (isDirectoryOk(iDst)) {
      showLog && err(`Source is a file "${iSrc}", but dst is an existing dir with exactly the same name "${fileName}". Copy skipped`);
      return;
    }
    count += copyFileToFileSync(iSrc, iDst, opt);
  });
  return count;
}


export function skipSystemFilesFilter(nextSrcFileName: string): boolean {
  switch (nextSrcFileName) {
    case 'Thumbs.db':
    case '.DS_Store':
      return false;
    default:
      return true;
  }
}
