import {isAbsolute} from 'path';
import {existsSync} from 'fs';
import {copySrcFile} from './copy-src-file';
import {copySrcDir} from './copy-src-dir';
import {ICopyOptions} from '../contract';
import {isDirectory} from '../directory';
import {err} from './log';

/**
 * @param src - absolute path From where copy
 * @param dst - absolute path To copy
 * @param opt
 * @Returns count of copied files
 */
export function copySync(src: string, dst: string, opt: ICopyOptions = {}): number {
  validateParams(src, dst);
  return isDirectory(src)
    ? copySrcDir(src, dst, opt)
    : copySrcFile(src, dst, opt);
}

function validateParams(src: string, dst: string): void {
  if (!src || !isAbsolute(src)) {
    err(`The path to src must be absolute: "${src}"`);
    throw '';
  }
  if (!dst || !isAbsolute(dst)) {
    err(`The path to dst must be absolute: "${dst}"`);
    throw '';
  }
  if (!existsSync(src)) {
    err(`src doesn't exist: "${src}"`);
    throw '';
  }
}
