import {basename, dirname, extname, join} from 'path';
import {existsSync} from 'fs';
import {copyFileToFileSync} from './copy-file-to-file-sync';
import {ensureDirExists, isDirectory} from '../directory';
import {ICopyOptions} from '../contract';
import {err, warn} from './log';

export function copySrcFile(src: string, dst: string, opt: ICopyOptions) {
  handleExt(src, dst, opt);
  if (existsSync(dst)) {
    if (isDirectory(dst))
      dst = join(dst, basename(src)); // now dst points to the target file in the existing directory
  } else {
    const dstDirPath = dirname(dst);    // dst points to the target file,
    if (!ensureDirExists(dstDirPath)) { // check the existence of the target directory
      err(`Can't copy src file "${src}" to dst file "${dst}", because dst dir "${dstDirPath}" is a file ¯\\_(ツ)_/¯`);
      throw '';
    }
  }
  return copyFileToFileSync(src, dst, opt);
}

function handleExt(src: string, dst: string, {showLog}: ICopyOptions): void {
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
