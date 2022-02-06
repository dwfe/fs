import {basename, dirname, extname, join} from 'path';
import {copyFileSync, existsSync} from 'fs';
import {ensureDirExists, isDirectory} from '../directory';
import {copyLog, err, warn} from './log';
import {ICopyOptions} from '../contract';

export function copySrcFile(src: string, dst: string, {showLog}: ICopyOptions) {
  const fileNameSrc = basename(src);
  handleExt(src, dst, showLog);
  if (existsSync(dst)) {
    if (isDirectory(dst))
      dst = join(dst, fileNameSrc); // now dst points to the target file in the existing directory
  } else {
    const dstDirPath = dirname(dst);    // dst points to the target file,
    if (!ensureDirExists(dstDirPath)) { // check the existence of the target directory
      err(`Can't copy src file "${src}" to dst file "${dst}", because dst dir "${dstDirPath}" is a file ¯\\_(ツ)_/¯`);
      throw '';
    }
  }
  showLog && copyLog(fileNameSrc, basename(dst), src, dst);
  copyFileSync(src, dst);
  return 1;
}

function handleExt(src: string, dst: string, showLog?: boolean): void {
  const dstExt = extname(dst);
  if (extname(src) !== dstExt) {
    /**
     * 1. dstExt exists
     *   a. path exists
     *      i. isDirectory - do nothing
     *     ii. isFile - show diffExtMessage
     *   b. path not exists - show diffExtMessage
     * 2. dstExt not exists
     *   a. path exists
     *      i. isDirectory - do nothing
     *     ii. isFile - show diffExtMessage
     *   b. path not exists - create directory - show a message about creating a directory
     */
    const diffExtMessage = () => showLog && warn(`Different *.ext for src file "${src}" and dst file "${dst}"`);
    if (dstExt) {
      if (!existsSync(dst) || !isDirectory(dst))
        diffExtMessage();
    } else {
      if (!ensureDirExists(dst, () => showLog && warn(`Created a dir, assuming that dst "${dst}" is a dir`)))
        diffExtMessage();
    }
  }
}
