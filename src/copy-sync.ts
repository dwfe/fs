import {copyFileSync, existsSync, readdirSync} from 'fs';
import {logErr, logWarn} from '@do-while-for-each/log-node';
import {ensureDir, isDirectory} from './directory';
import {basename, extname, join} from 'path';

export function copySync(
  src: string, // absolute path From where copy
  dst: string, // absolute path To copy
  allowedToCopyFilter?: (srcFileName: string) => boolean
): void {
  if (!existsSync(src))
    return;
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
      // 1. dstExt exists
      //   а. path exists
      //      i. isDirectory - do nothing
      //     ii. isFile - show diffExtMessage
      //   б. path not exists - show diffExtMessage
      // 2. dstExt not exists
      //   а. path exists
      //      i. isDirectory - do nothing
      //     ii. isFile - show diffExtMessage
      //   б. path not exists - create directory - show a message about creating a directory
      const diffExtMessage = () => warn(`Different extensions for src file "${src}" and dst file "${dst}"`);
      if (dstExt) {
        if (existsSync(dst)) {
          if (!isDirectory(dst))
            diffExtMessage();
        } else
          diffExtMessage();
      } else {
        if (!ensureDir(dst, () => warn(`I will assume that dst "${dst}" is a directory`)))
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

