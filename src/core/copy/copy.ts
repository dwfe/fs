import {isAbsolute} from 'path';
import {isDirectory, validateSrc} from '../common';
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
  validateParams(src, dst);
  return isDirectory(src)
    ? copySrcDir(src, dst, opt)
    : copySrcFile(src, dst, opt);
}

function validateParams(src: string, dst: string): void {
  validateSrc(src);
  if (!dst || !isAbsolute(dst)) {
    err(`The path to dst must be absolute: "${dst}"`, true);
    throw '';
  }
}
