import {isAbsolute} from 'path';
import {existsSync} from 'fs';
import {getStats, isDirectory} from '../common';
import {copySrcFile} from './copy-src-file';
import {copySrcDir} from './copy-src-dir';
import {ICopyOpt} from '../contract';
import {err} from './log';

/**
 * @param src - absolute path From where copy
 * @param dst - absolute path To copy
 * @param opt
 * @Returns count of copied files
 */
export function copy(src: string, dst: string, opt: ICopyOpt = {}): number {
  opt.srcStats = getStats(src);
  validateParams(src, dst, opt);
  return isDirectory(src, opt.srcStats)
    ? copySrcDir(src, dst, opt)
    : copySrcFile(src, dst, opt);
}

function validateParams(src: string, dst: string, {srcStats}: ICopyOpt): void {
  if (!src || !isAbsolute(src)) {
    err(`The path to src must be absolute: "${src}"`, true);
    throw '';
  }
  if (!dst || !isAbsolute(dst)) {
    err(`The path to dst must be absolute: "${dst}"`, true);
    throw '';
  }
  if (!existsSync(src)) {
    err(`src doesn't exist: "${src}"`, true);
    throw '';
  }
  if (srcStats?.isSocket()) {
    err(`Can't copy a socket file: ${src}`, true);
    throw '';
  }
  if (srcStats?.isFIFO()) {
    err(`Can't copy a first-in-first-out (FIFO) pipe: ${src}`, true);
    throw '';
  }
}
