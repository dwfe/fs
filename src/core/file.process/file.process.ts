import {logErr} from '@do-while-for-each/log-node';
import {existsSync} from 'fs';
import {cleanDir, cleanDirs} from '../directory';
import {TFileProcessTask} from '../contract';
import {validateSrc} from '../validator';
import {printTask} from './print-task';
import {removeForce} from '../remove';
import {copy} from '../copy';
import {move} from '../move';

export class FileProcess {

  static run(tasks: Array<TFileProcessTask>) {
    tasks.forEach(task => {
      printTask(task);
      const [cmd, [src, dst], {showLog, dirPaths, fileNames}] = task;
      switch (cmd) {
        case 'rmForce':
          validateSrc(src, {skipExistsCheck: true});
          if (existsSync(src))
            removeForce(src, {showLog});
          return;
        case 'cp':
          copy(src, dst as string, {showLog});
          return;
        case 'mv':
          move(src, dst as string, {showLog});
          return;
        case 'cleanDir':
          validateSrc(src);
          cleanDir(src, {showLog, fileNamesToRemove: fileNames, skipCheck: true});
          return;
        case 'cleanDirs':
          cleanDirs(dirPaths as string[], {showLog, fileNamesToRemove: fileNames});
          break;
        default:
          logErr('FileProcess:', `Unknown command "${cmd}"`);
          throw '';
      }
    })
  }
}
