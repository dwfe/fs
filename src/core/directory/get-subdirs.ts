import {readdirSync} from 'fs';
import {join} from 'path';
import {isDirectory} from '../common';

export function getSubdirs(dirPaths: string | string[]): string[] {
  dirPaths = Array.isArray(dirPaths) ? dirPaths : [dirPaths];
  const subdirs = dirPaths.map(dirPath => {
    if (isDirectory(dirPath))
      return readdirSync(dirPath, {withFileTypes: true})
        .map(stats => {
          if (stats.isDirectory())
            return join(dirPath, stats.name)
        })
        .filter(Boolean);
  }).filter(Boolean).flat();
  return subdirs as string[];
}
