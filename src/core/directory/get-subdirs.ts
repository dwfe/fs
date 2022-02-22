import {traverseDir} from './traverse-dir';
import {isDirectory} from '../common';

export const getSubdirs = (dirPaths: string | string[], maxLevel = 1): string[] => (
  (Array.isArray(dirPaths) ? dirPaths : [dirPaths])
    .map(path => {
      const dirs: string[] = [];
      if (isDirectory(path))
        traverseDir(path, {
          callback: args => {
            if (args.iStats.isDirectory())
              dirs.push(args.iFilePath);
          },
          maxLevel
        });
      return dirs;
    })
    .flat()
);
