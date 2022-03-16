import {ARGS, findArg, getPathArg, normalizePath, parseOptValue} from './params';
import {TFileProcessCmd} from '../core/contract';
import {getSubdirs} from '../core/directory';

export function parseArgs() {
  const needToConfirm = !findArg('--noConfirm');
  return {
    cmd: ARGS[0] as TFileProcessCmd,
    src: getPathArg(1),
    dst: getPathArg(2),
    showLog: !findArg('--hideLog'),
    dirPaths: parseDirPaths(),
    fileNames: parseOptValue('--fileNames'),
    needToConfirm,
    printParams: needToConfirm ? true : !findArg('--noPrintParams')
  };
}

function parseDirPaths(): string[] {
  return parseOptValue('--dirPaths').map(dirPath => {
    const hasMaskAll = dirPath.endsWith('*');
    if (hasMaskAll)
      dirPath = dirPath.replaceAll('*', '');
    dirPath = normalizePath(dirPath);
    return hasMaskAll ? getSubdirs(dirPath) : dirPath;
  }).flat();
}
