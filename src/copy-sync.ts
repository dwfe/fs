import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {join} from 'path';
import {isDirectory} from './directory';

export function copySync(
  src: string, // absolute path From where copy
  dst: string, // absolute path To copy
  allowedToCopyFilter?: (srcFileName: string) => boolean
): void {
  if (!existsSync(src))
    return;
  if (isDirectory(src)) {
    if (!existsSync(dst))
      mkdirSync(dst);
    let fileNames = readdirSync(src);
    if (allowedToCopyFilter)
      fileNames = fileNames.filter(allowedToCopyFilter);
    fileNames.forEach(fileName => {
      copySync(
        join(src, fileName),
        join(dst, fileName),
        allowedToCopyFilter
      );
    });
  } else
    copyFileSync(src, dst);
}
