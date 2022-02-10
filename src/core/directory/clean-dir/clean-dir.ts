import {readdirSync} from 'fs';
import {join} from 'path';
import {isDirectoryOk} from '../../validator';
import {ICleanDirOpt} from '../../contract';
import {removeForce} from '../../remove';

export function cleanDir(path: string, opt: ICleanDirOpt = {}): boolean {
  if (!isParamsOk(path, opt))
    return false;
  const {fileNamesToRemove, allowedToRemoveFilter, showLog} = opt;
  readdirSync(path, {withFileTypes: true}).forEach(stats => {
    const fileName = stats.name;
    if (fileNamesToRemove && !fileNamesToRemove.includes(fileName))
      return;
    if (allowedToRemoveFilter && !allowedToRemoveFilter(fileName, path))
      return;
    removeForce(join(path, fileName), {stats, showLog});
  });
  return true;
}

function isParamsOk(path: string, {stats, showLog, skipCheck}: ICleanDirOpt): boolean {
  if (skipCheck)
    return true;
  return isDirectoryOk(path, {stats, showLog});
}
