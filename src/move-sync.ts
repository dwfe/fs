import {copySync, ICopySyncOptions} from './copy-sync';
import {removeSync} from './common';

export function moveSync(src: string, dst: string, opt?: ICopySyncOptions): void {
  if (copySync(src, dst, opt))
    removeSync(src);
}
