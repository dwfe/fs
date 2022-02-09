import {basename, join} from 'path';
import {readdirSync} from 'fs';
import {isDirectory, isDirectoryOk} from '../common';
import {copyFileToFile} from './copy-file-to-file';
import {ensureDirExists} from '../directory';
import {ICopyOpt} from '../contract';
import {copyLog, err} from './log';

export function copySrcDir(src: string, dst: string, opt: ICopyOpt) {
  const {showLog} = opt;
  if (!ensureDirExists(dst)) {
    err(`Can't copy src dir "${src}" to dst file "${dst}"`, true);
    throw '';
  }
  let count = 0;
  const dirNameSrc = basename(src);
  const dirNameDst = basename(dst);
  if (dirNameSrc === dirNameDst) {
    count = 1; // copied src dir itself
    copyLog(src, dst, opt);
  }
  readdirSync(src, {withFileTypes: true}).forEach(srcStats => {
    const iOpt = {...opt, srcStats};
    const fileName = srcStats.name;
    const iSrc = join(src, fileName);
    const iDst = join(dst, fileName);
    if (isDirectory(iSrc, srcStats)) {
      count += copySrcDir(iSrc, iDst, iOpt);
      return;
    } else if (isDirectoryOk(iDst)) {
      err(`Source is a file "${iSrc}", but dst is an existing dir with exactly the same name "${fileName}". Copy skipped`, showLog);
      return;
    }
    count += copyFileToFile(iSrc, iDst, iOpt);
  });
  return count;
}


