import {isAbsolute, join} from 'path';
import {TOptions} from './contract';

//region File paths

export const BASE_DIR: Readonly<string> = process.cwd();

//endregion


//region Arguments

const [, , ...args] = process.argv;
export const ARGS: Readonly<string[]> = args;

const ARG_VALUE_SEPARATOR = '=';  // --dirPaths="/Users/z"
const ARG_VALUES_SEPARATOR = ';'; // --dirPaths="/Users/z;dist/src"
const OPT_PREFIX = '--';

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

export function getPathArg(index: number): string {
  const arg = ARGS[index];
  if (arg && !arg.startsWith(OPT_PREFIX))
    return normalizePath(arg);
  return '';
}

export function findArg(type: TOptions): string | undefined {
  const regexp = new RegExp(type);
  return ARGS.find(a => regexp.test(a));
}

export function getOptValue(type: TOptions): string | undefined {
  const arg = findArg(type);
  if (!arg)
    return;
  return arg.split(ARG_VALUE_SEPARATOR)[1];
}

export function parseOptValue(type: TOptions): string[] {
  const value = getOptValue(type);
  if (!value)
    return [];
  return value.split(ARG_VALUES_SEPARATOR);
}

//endregion
