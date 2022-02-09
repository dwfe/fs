import {logErr} from '@do-while-for-each/log-node';
import {basename, dirname, join} from 'path';
import {existsSync, mkdirSync} from 'fs';

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
