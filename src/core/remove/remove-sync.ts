import {rmSync, unlinkSync} from 'fs';
import {getStats, isDirectory, isSymbolicLink} from '../common';
import {IRemoveOpt} from '../contract';

export function removeSync(path: string, {force, stats}: IRemoveOpt): void {
  stats = stats || getStats(path);
  if (isSymbolicLink(path, stats))
    unlinkSync(path);
  else
    rmSync(path, {
      recursive: isDirectory(path, stats),
      force: !!force
    });
}
