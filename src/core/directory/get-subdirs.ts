import {readdirSync} from 'fs';
import {join} from 'path';
import {isDirectory} from '../common';

export const getSubdirs = (dirPaths: string | string[]): string[] => (
  (Array.isArray(dirPaths) ? dirPaths : [dirPaths])
    .map(dirPath => {
      if (isDirectory(dirPath))
        return readdirSync(dirPath, {withFileTypes: true})
          .map(stats => {
            if (stats.isDirectory())
              return join(dirPath, stats.name)
          })
          .filter(Boolean);
    })
    .filter(Boolean)
    .flat() as string[]
);
