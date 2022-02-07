import {IRemoveOptions} from '../contract';
import {rmSync} from 'fs';
import {isDirectory} from '../common';

export function removeSync(path: string, {force, stats}: IRemoveOptions): void {
  rmSync(path, {
    recursive: isDirectory(path, stats),
    force
  });
}
