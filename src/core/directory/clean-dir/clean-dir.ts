import {readdirSync} from 'fs';
import {join} from 'path';
import {ICleanDirOpt, IValidateOpt} from '../../contract';
import {isDirectoryOk} from '../../validator';
import {removeForce} from '../../remove';

export function cleanDir(path: string, opt: ICleanDirOpt & IValidateOpt = {}): boolean {
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

function isParamsOk(path: string, {stats, showLog, skipCheck}: ICleanDirOpt & IValidateOpt): boolean {
  if (skipCheck)
    return true;
  return isDirectoryOk(path, {stats, showLog});
}
