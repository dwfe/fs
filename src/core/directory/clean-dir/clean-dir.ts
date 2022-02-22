import {isDirectoryOk} from '../../validator';
import {ICleanDirOpt} from '../../contract';
import {traverseDir} from '../traverse-dir';
import {removeForce} from '../../remove';

export function cleanDir(path: string, opt: ICleanDirOpt = {}): boolean {
  if (!isParamsOk(path, opt))
    return false;
  const {fileNamesToRemove, allowedToRemoveFilter, showLog} = opt;
  traverseDir(path, {
    callback: args => {
      if (fileNamesToRemove && !fileNamesToRemove.includes(args.iStats.name))
        return;
      if (allowedToRemoveFilter && !allowedToRemoveFilter(args))
        return;
      removeForce(args.iFilePath, {stats: args.iStats, showLog});
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
