import {ICleanDirOpt} from '../contract';
import {isDirectoryOk} from '../common';
import {cleanDir} from './clean-dir';
import {action, err} from './log';

export function cleanDirs(dirPaths: string[], opt: ICleanDirOpt = {}): void {
  isParamsValid(dirPaths, opt);
  const {showLog} = opt;
  const startTime = +new Date();
  dirPaths.forEach(path => {
    action(path, showLog);
    cleanDir(path, opt);
  });
  action(`Spent time: ${(+new Date() - startTime) / 1000} sec.`, showLog);
}

function isParamsValid(dirPaths: string[], {fileNamesToRemove}: ICleanDirOpt): void {
  if (!dirPaths || dirPaths.length === 0) {
    err(`Empty list of directory paths`, true);
    throw '';
  }
  dirPaths.forEach(path => {
    if (!isDirectoryOk(path, {showLog: true})) {
      throw '';
    }
  });
  if (fileNamesToRemove && fileNamesToRemove.length > 0) {
    fileNamesToRemove.forEach(fileName => {
      if (!fileName) {
        err(`The list of file names to be removed contains an incorrect file name: "${fileName}"`, true);
        throw '';
      }
    });
  }
}
