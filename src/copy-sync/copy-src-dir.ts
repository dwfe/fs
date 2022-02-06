import {copyFileSync, readdirSync} from 'fs';
import {basename, join} from 'path';
import {ensureDirExists, isDirectory, isDirectoryOk} from '../directory';
import {ICopyOptions} from '../contract';
import {copySync} from './copy-sync';
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
      count += copySync(iSrc, iDst, opt);
      return;
    } else if (isDirectoryOk(iDst)) {
      showLog && err(`Source is a file "${iSrc}", but dst is an existing dir with exactly the same name "${fileName}". Copy skipped`);
      return;
    }
    showLog && copyLog(fileName, fileName, src, dst);
    copyFileSync(iSrc, iDst); // here it is guaranteed that the existing src file is copied to the dst file
    count++;
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
