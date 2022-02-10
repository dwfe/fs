import {readdirSync} from 'fs';
import {join} from 'path';
import {isDirectoryOk} from '../../validator';
import {ICleanDirOpt} from '../../contract';
import {removeForce} from '../../remove';

export function cleanDir(path: string, {showLog, fileNamesToRemove, allowedToRemoveFilter, stats}: ICleanDirOpt = {}): boolean {
  if (!isDirectoryOk(path, {skipExistsCheck: true, stats, showLog}))
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
