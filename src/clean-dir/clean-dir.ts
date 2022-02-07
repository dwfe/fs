import {readdirSync} from 'fs';
import {join} from 'path';
import {removeForce} from '../remove/remove-force';
import {ICleanDirOpt} from '../contract';

export function cleanDir(path: string, {showLog, fileNamesToRemove, allowedToRemoveFilter}: ICleanDirOpt = {}): boolean {
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
