import {logErr} from '@do-while-for-each/log-node';
import {TFileProcessCmd} from './contract';
import {cleanDir} from './directory';
import {removeForce} from './remove';
import {validateSrc} from './common';
import {copy} from './copy';
import {move} from './move';

export class FileProcess {

  static run(tasks: Array<[TFileProcessCmd, [string, string?], boolean]>) {
    tasks.forEach(([cmd, [src, dest], showLog]) => {
      switch (cmd) {
        case 'rmForce':
          validateSrc(src);
          removeForce(src, {showLog});
          return;
        case 'cp':
          copy(src, dest as string, {showLog});
          return;
        case 'mv':
          move(src, dest as string, {showLog});
          return;
        case 'cleanDir':
          validateSrc(src);
          cleanDir(src, {showLog});
          return;
        default:
          logErr('FileProcess:', `Unknown command "${cmd}"`);
          throw '';
      }
    })
  }
}
