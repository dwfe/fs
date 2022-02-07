import {IEnsureDirExistsOpt} from '../contract';
import {existsSync} from 'fs';
import {mkdirCyclical} from './mkdir-cyclical';
import {isDirectory} from '../common';

/**
 * Make sure the directory exists.
 * @Returns:
 *   true  - directory exists;
 *   false - path exists and it is a file;
 */
export function ensureDirExists(path: string, {stats, afterCreatingDir}: IEnsureDirExistsOpt = {}): boolean {
  if (existsSync(path))
    return isDirectory(path, stats);
  mkdirCyclical(path);
  afterCreatingDir?.();
  return true;
}
