import {basename, join} from 'path';
import {readdirSync} from 'fs';
import {ensureDirExists, isDirectory, isDirectoryOk} from '../directory';
import {copyFileToFileSync} from './copy-file-to-file-sync';
import {ICopyOptions} from '../contract';
import {copyLog, err} from './log';

export function copySrcDir(src: string, dst: string, opt: ICopyOptions) {
  if (!ensureDirExists(dst)) {
    err(`Can't copy src dir "${src}" to dst file "${dst}"`, true);
    throw '';
  }
  let count = 0;
  const {showLog} = opt;
  const dirNameSrc = basename(src);
  const dirNameDst = basename(dst);
  if (dirNameSrc === dirNameDst) {
    count = 1; // copied src dir itself
    copyLog(src, dst, showLog);
  }
  readdirSync(src).forEach(fileName => {
    const iSrc = join(src, fileName);
    const iDst = join(dst, fileName);
    if (isDirectory(iSrc)) {
      count += copySrcDir(iSrc, iDst, opt);
      return;
    } else if (isDirectoryOk(iDst)) {
      err(`Source is a file "${iSrc}", but dst is an existing dir with exactly the same name "${fileName}". Copy skipped`, showLog);
      return;
    }
    count += copyFileToFileSync(iSrc, iDst, opt);
  });
  return count;
}


