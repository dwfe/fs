import {TOptions} from './contract';
import {isAbsolute, join} from 'path';

//region File paths

export const BASE_DIR: Readonly<string> = process.cwd();

//endregion


//region Arguments

const [, , ...args] = process.argv;
export const ARGS: Readonly<string[]> = args;

//endregion


//region Support

export function relativeToBase(...paths: string[]): string {
  return join(BASE_DIR, ...paths)
}

export function normalizePath(path: string): string {
  if (path && !isAbsolute(path))
    return relativeToBase(path);
  return path;
}

export function findArg(type: TOptions): boolean {
  const regexp = new RegExp(type);
  return ARGS.filter(a => regexp.test(a)).length > 0;
}

//endregion
