import {logAction, logErr, logOption, logWarn} from '@do-while-for-each/log-node';
import {basename, dirname, extname, isAbsolute, join} from 'path';
import {copyFileSync, existsSync, readdirSync} from 'fs';
import {ensureDirExists, isDirectory, isDirectoryOk} from './directory';

export interface ICopySyncOptions {
  showLog?: boolean;
  skipSystemFiles?: boolean; // Thumbs.db, .DS_Store
  allowedToCopyFilter?: (nextSrcFileName: string, srcDirPath: string, dstDirPath: string) => boolean;
}

export function copySync(
  src: string, // absolute path From where copy
  dst: string, // absolute path To copy
  opt: ICopySyncOptions = {}
): number // count of copied files
{
  const {showLog, skipSystemFiles, allowedToCopyFilter} = opt;
  if (!src || !isAbsolute(src)) {
    err(`The path to the source must be absolute: "${src}"`);
    throw '';
  }
  if (!dst || !isAbsolute(dst)) {
    err(`The path to the destination must be absolute: "${dst}"`);
    throw '';
  }
  if (!existsSync(src)) {
    err(`Source doesn't exist: "${src}"`);
    throw '';
  }
  const fileNameSrc = basename(src);

  if (isDirectory(src)) {
    if (!ensureDirExists(dst)) {
      err(`Can't copy src dir "${src}" to dst file "${dst}"`);
      throw '';
    }
    /**
     * src is a existed dir -> dst is a existed dir
     */
    let count = 0;
    const fileNameDst = basename(dst);
    if (fileNameSrc === fileNameDst) {
      count = 1; // copied src dir itself
      showLog && copyLog(fileNameSrc, fileNameDst, dirname(src), dirname(dst));
    }
    let fileNames = readdirSync(src);
    if (allowedToCopyFilter)
      fileNames = fileNames.filter((fileName) => allowedToCopyFilter(fileName, src, dst));
    if (skipSystemFiles)
      fileNames = fileNames.filter((fileName) => skipSystemFilesFilter(fileName));
    fileNames.forEach(fileName => {
      const iSrc = join(src, fileName);
      const iDst = join(dst, fileName);
      if (isDirectory(iSrc)) {
        count += copySync(iSrc, iDst, opt);
        return;
      } else if (isDirectoryOk(iDst)) {
        showLog && err(`Source is a file "${iSrc}", but dst is an existing dir with exactly the same name "${fileName}"`);
        return; // skip copying the current file
      }
      showLog && copyLog(fileName, fileName, src, dst);
      copyFileSync(iSrc, iDst); // here it is guaranteed that the existing src file is copied to the dst file
      count++;
    });
    return count;
  }

  /**
   * src as file -> dst as ?
   */
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
  if (existsSync(dst)) {
    if (isDirectory(dst))
      dst = join(dst, fileNameSrc); // now dst this is a target file in an existing directory
  } else {
    const targetDirPath = dirname(dst);
    if (!ensureDirExists(targetDirPath)) {
      err(`Can't copy src file "${src}" to dst file "${dst}", because target dir "${targetDirPath}" is a file ¯\\_(ツ)_/¯`);
      throw '';
    }
  }
  showLog && copyLog(fileNameSrc, basename(dst), dirname(src), dirname(dst));
  copyFileSync(src, dst);
  return 1;
}

//region Log

function err(message: string): void {
  logErr('Copy sync:', message);
}

function warn(message: string): void {
  logWarn('Copy sync:', message);
}

function copyLog(fileNameSrc: string, fileNameDst: string, srcDirPath: string, dstDirPath: string): void {
  logAction('Copy:');
  logOption('name', fileNameSrc === fileNameDst ? fileNameSrc : `${fileNameSrc} -> ${fileNameDst}`)
  logOption('src', srcDirPath);
  logOption('dst', dstDirPath);
  console.log(' ');
}

//endregion

function skipSystemFilesFilter(nextSrcFileName: string): boolean {
  switch (nextSrcFileName) {
    case 'Thumbs.db':
    case '.DS_Store':
      return false;
    default:
      return true;
  }
}



