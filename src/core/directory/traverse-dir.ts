import {readdirSync} from 'fs';
import {join} from 'path';
import {ITraverseDirOpt} from '../contract';
import {isDirectory} from '../common';

export function traverseDir(path: string, opt: ITraverseDirOpt): void {
  traverse(path, 1, opt);
}

function traverse(path: string, level: number, opt: ITraverseDirOpt): void {
  if (opt.maxLevel < level)
    return;
  const nextLevel = level + 1;
  readdirSync(path, {withFileTypes: true}).forEach(iStats => {
    const iFilePath = join(path, iStats.name);
    opt.callback({iFilePath, iStats, iPath: path});
    if (isDirectory(iFilePath) && opt.maxLevel >= nextLevel)
      traverse(iFilePath, nextLevel, opt);
  });
}
