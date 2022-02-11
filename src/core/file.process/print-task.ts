import {logAction, logErr, logOption} from '@do-while-for-each/log-node';
import {TFileProcessTask} from '../contract';

export function printTask([cmd, [src, dst], {showLog, dirPaths, fileNames, printParams}]: TFileProcessTask): void {
  if (!printParams)
    return;
  logAction('Task params:');
  logOption('cmd', cmd);
  switch (cmd) {
    case 'rmForce':
      logOption('path', src);
      break;
    case 'cp':
    case 'mv':
      logOption('src', src);
      logOption('dst', dst);
      break;
    case 'cleanDir':
      logOption('path', src);
      if (fileNames)
        logOption('fileNamesToRemove', fileNames, false);
      else
        logOption('fileNamesToRemove', '');
      break;
    case 'cleanDirs':
      if (dirPaths)
        logOption('dirPaths', dirPaths, false);
      else
        logOption('dirPaths', '');
      if (fileNames)
        logOption('fileNamesToRemove', fileNames, false);
      else
        logOption('fileNamesToRemove', '');
      break;
    default:
      logErr('Print FileProcess task:', `Unknown cmd "${cmd}"`);
      throw '';
  }
  logOption('showLog', showLog);
  console.log('------------------------------');
}
