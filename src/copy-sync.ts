import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {logErr, logWarn} from '@do-while-for-each/log-node';
import {basename, extname, join} from 'path';
import {isDirectory} from './directory';

export function copySync(
  src: string, // absolute path From where copy
  dst: string, // absolute path To copy
  allowedToCopyFilter?: (srcFileName: string) => boolean
): void {
  if (!existsSync(src))
    return;
  if (isDirectory(src)) {
    if (!existsSync(dst))
      mkdirSync(dst);
    if (!isDirectory(dst)) {
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
      if (!dstExt && !existsSync(dst)) {
        warn(`I will assume that dst "${dst}" is a directory`);
        mkdirSync(dst);
      } else
        warn(`Different extensions for src file "${src}" and dst file "${dst}"`);
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

