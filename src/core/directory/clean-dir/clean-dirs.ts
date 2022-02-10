import {isDirectoryOk} from '../../validator';
import {ICleanDirOpt} from '../../contract';
import {cleanDir} from './clean-dir';
import {action, err} from './log';

export function cleanDirs(dirPaths: string[], opt: ICleanDirOpt = {}): void {
  validateParams(dirPaths, opt);
  const {showLog} = opt;
  const startTime = +new Date();
  dirPaths.forEach(path => {
    action(`Cleaning dir ${path}`, showLog);
    cleanDir(path, {...opt, skipCheck: true});
  });
  action(`Spent time: ${(+new Date() - startTime) / 1000} sec.`, showLog);
}

function validateParams(dirPaths: string[], {fileNamesToRemove}: ICleanDirOpt): void {
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
