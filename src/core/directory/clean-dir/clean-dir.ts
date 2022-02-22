import {isDirectoryOk} from '../../validator';
import {ICleanDirOpt} from '../../contract';
import {traverseDir} from '../traverse-dir';
import {removeForce} from '../../remove';

export function cleanDir(path: string, opt: ICleanDirOpt = {}): boolean {
  if (!isParamsOk(path, opt))
    return false;
  const {fileNamesToRemove, allowedToRemoveFilter, showLog} = opt;
  traverseDir(path, {
    callback: ({iStats, iFilePath, iPath}) => {
      const fileName = iStats.name;
      if (fileNamesToRemove && !fileNamesToRemove.includes(fileName))
        return;
      if (allowedToRemoveFilter && !allowedToRemoveFilter(fileName, iPath))
        return;
      removeForce(iFilePath, {stats: iStats, showLog});
    },
    maxLevel: 1
  });
  return true;
}

function isParamsOk(path: string, {stats, showLog, skipCheck}: ICleanDirOpt): boolean {
  if (skipCheck)
    return true;
  return isDirectoryOk(path, {stats, showLog});
}
