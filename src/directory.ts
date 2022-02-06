import {existsSync, lstatSync, mkdirSync, readdirSync, rmSync} from 'fs';
import {logErr} from '@do-while-for-each/log-node';
import {basename, dirname, join} from 'path';

export function isDirectory(path: string): boolean {
  return lstatSync(path).isDirectory();
}

export function isDirectoryOk(path: string, showLog?: boolean): boolean {
  const title = 'Directory check:';
  if (!existsSync(path)) {
    showLog && logErr(title, `Path "${path}" doesn't exist`);
    return false;
  }
  if (!isDirectory(path)) {
    showLog && logErr(title, `Path "${path}" is not a dir`);
    return false;
  }
  return true;
}

/**
 * Make sure the directory exists.
 * @Returns:
 *   true  - directory exists;
 *   false - path exists and it is a file;
 */
export function ensureDirExists(path: string, afterCreatingDir?: () => void): boolean {
  if (existsSync(path))
    return isDirectory(path);
  mkdirCyclical(path);
  afterCreatingDir?.();
  return true;
}

export function mkdirCyclical(targetDirPath: string): string[] {
  let safeguardCount = 0;
  const childrenToCreate: string[] = [];
  let path = (' ' + targetDirPath).slice(1);
  while (!existsSync(path)) {
    childrenToCreate.unshift(basename(path));
    path = dirname(path);
    safeguardCount++;
    if (safeguardCount > 20) {
      logErr('mkdirCyclical:', `Something is wrong with target dir "${targetDirPath}". Search for non-existent children interrupted on path "${path}". Current children to create: ${childrenToCreate}`);
      throw '';
    }
  }
  childrenToCreate.forEach(dirName => {
    path = join(path, dirName);
    mkdirSync(path);
  });
  return childrenToCreate;
}

export function cleanDir(path: string, showLog?: boolean): boolean {
  if (!isDirectoryOk(path, showLog))
    return false;
  readdirSync(path)
    .map(fileName => join(path, fileName))
    .forEach(filePath =>
      rmSync(filePath, {
        recursive: isDirectory(filePath),
        force: true
      })
    );
  return true;
}
