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
  if (!isAbsolute(src)) {
    showLog && err(`The path to the source must be absolute: "${src}"`);
    return 0;
  }
  if (!isAbsolute(dst)) {
    showLog && err(`The path to the destination must be absolute: "${dst}"`);
    return 0;
  }
  if (!existsSync(src)) {
    showLog && err(`Source doesn't exist: "${src}"`);
    return 0;
  }

  if (isDirectory(src)) {
    if (!ensureDirExists(dst)) {
      showLog && err(`Can't copy src dir "${src}" to dst file "${dst}"`);
      return 0;
    }
    /**
     * src is a dir -> dst is a dir
     */
    let fileNames = readdirSync(src);
    if (allowedToCopyFilter)
      fileNames = fileNames.filter((fileName) => allowedToCopyFilter(fileName, src, dst));
    if (skipSystemFiles)
      fileNames = fileNames.filter((fileName) => skipSystemFilesFilter(fileName));
    let count = 0;
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
  const fileNameSrc = basename(src);
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
      showLog && err(`Can't copy src file "${src}" to dst file "${dst}", because target dir "${targetDirPath}" is a file ¯\\_(ツ)_/¯`);
      return 0;
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
  logOption('file', fileNameSrc === fileNameDst ? fileNameSrc : `${fileNameSrc} -> ${fileNameDst}`)
  logOption('src', srcDirPath);
  logOption('dst', dstDirPath);
  console.log(' ')
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



