import {readdirSync} from 'fs';
import {join} from 'path';
import {ITraverseDirOpt} from '../contract';
import {isDirectory} from '../common';

export function traverseDir(path: string, opt: ITraverseDirOpt): void {
  traverse(path, 1, opt);
}

function traverse(iPath: string, level: number, opt: ITraverseDirOpt): void {
  if (opt.maxLevel < level)
    return;
  const nextLevel = level + 1;
  readdirSync(iPath, {withFileTypes: true}).forEach(iStats => {
    const iFilePath = join(iPath, iStats.name);
    const needToTraverse = isDirectory(iFilePath, iStats) && opt.maxLevel >= nextLevel;
    opt.callback({iFilePath, iPath, iStats});
    if (needToTraverse)
      traverse(iFilePath, nextLevel, opt);
  });
}
