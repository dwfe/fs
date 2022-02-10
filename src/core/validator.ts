import {logErr} from '@do-while-for-each/log-node';
import {isAbsolute} from 'path';
import {existsSync} from 'fs';
import {ICommonOpt, IValidateSrcOpt} from './contract';
import {getStats, isDirectory} from './common';


export function isDirectoryOk(path: string, {stats, showLog}: ICommonOpt = {}): boolean {
  const title = 'Directory check:';
  if (!path || !isAbsolute(path) || !existsSync(path)) {
    showLog && logErr(title, `The dir path must be absolute and exist: "${path}"`);
    return false;
  }
  if (!isDirectory(path, stats)) {
    showLog && logErr(title, `The path must point to the directory: "${path}"`);
    return false;
  }
  return true;
}

export function validateSrc(src: string, {skipExistsCheck}: IValidateSrcOpt = {}): void {
  const title = 'Validate src:';
  if (!src || !isAbsolute(src)) {
    logErr(title, `The path to src must be absolute: "${src}"`);
    throw '';
  }
  if (existsSync(src)) {
    const srcStats = getStats(src);
    if (srcStats.isSocket()) {
      logErr(title, `Can't process src as socket file: "${src}"`);
      throw '';
    }
    if (srcStats.isFIFO()) {
      logErr(title, `Can't process src as first-in-first-out (FIFO) pipe: "${src}"`);
      throw '';
    }
  } else if (!skipExistsCheck) {
    logErr(title, `src doesn't exist: "${src}"`);
    throw '';
  }
}
