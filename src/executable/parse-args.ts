import {ARGS, findArg, getPathArg, normalizePath, parseOptValue} from './params';
import {TFileProcessCmd} from '../core/contract';

export function parseArgs() {
  const needToConfirm = !findArg('--noConfirm');
  return {
    cmd: ARGS[0] as TFileProcessCmd,
    src: getPathArg(1),
    dst: getPathArg(2),
    showLog: !findArg('--hideLog'),
    dirPaths: parseOptValue('--dirPaths').map(dirPath => normalizePath(dirPath)),
    fileNames: parseOptValue('--fileNames'),
    needToConfirm,
    printParams: needToConfirm ? true : !findArg('--noPrintParams')
  };
}
