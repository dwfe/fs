import {readdirSync} from 'fs';
import {join} from 'path';
import {ICleanDirOpt, IValidateOpt} from '../../contract';
import {isDirectoryOk} from '../../validator';
import {removeForce} from '../../remove';

export function cleanDir(path: string, {fileNamesToRemove, allowedToRemoveFilter, stats, showLog, skipExistsCheck}: ICleanDirOpt & IValidateOpt = {}): boolean {
  if (!isDirectoryOk(path, {stats, showLog, skipExistsCheck}))
    return false;
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
