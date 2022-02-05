import {logErr, logWarn} from '@do-while-for-each/log-node';
import {copyFileSync, existsSync, readdirSync} from 'fs';
import {basename, extname, join} from 'path';
import {ensureDir, isDirectory} from './directory';

export function copySync(
  src: string, // absolute path From where copy
  dst: string, // absolute path To copy
  allowedToCopyFilter?: (srcFileName: string) => boolean
): void {
  if (!existsSync(src)) {
    err(`Source file "${src}" doesn't exist`);
    throw '';
  }
  if (isDirectory(src)) {
    if (!ensureDir(dst)) {
      err(`Can't copy src dir "${src}" to dst file "${dst}"`);
      throw '';
    }
    let fileNames = readdirSync(src);
    if (allowedToCopyFilter)
      fileNames = fileNames.filter(allowedToCopyFilter);
    fileNames.forEach(fileName => {
      copySync(
        join(src, fileName),
        join(dst, fileName),
        allowedToCopyFilter
      );
    });
  } else {
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
      const diffExtMessage = () => warn(`Different *.ext for src file "${src}" and dst file "${dst}"`);
      if (dstExt) {
        if (!existsSync(dst) || !isDirectory(dst))
          diffExtMessage();
      } else {
        if (!ensureDir(dst, () => warn(`Created a dir, assuming that dst "${dst}" is a dir`)))
          diffExtMessage();
      }
    }
    if (existsSync(dst) && isDirectory(dst))
      dst = join(dst, basename(src));
    copyFileSync(src, dst);
  }
}

function err(message: string): void {
  logErr('Copy sync:', message);
}

function warn(message: string): void {
  logWarn('Copy sync:', message);
}

