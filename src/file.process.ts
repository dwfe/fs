import {logErr} from '@do-while-for-each/log-node';
import {removeForce} from './remove/remove-force';
import {cleanDir} from './clean-dir/clean-dir';
import {TFileProcessCmd} from './contract';
import {copy} from './copy/copy';
import {move} from './move';

export class FileProcess {

  static run(tasks: Array<[TFileProcessCmd, [string, string?], boolean]>) {
    tasks.forEach(([cmd, [src, dest], showLog]) => {
      switch (cmd) {
        case 'clean-dir':
          cleanDir(src, {showLog});
          return;
        case 'move':
          move(src, dest as string, {showLog});
          return;
        case 'copy':
          copy(src, dest as string, {showLog});
          return;
        case 'remove':
          removeForce(src, {showLog});
          return;
        default:
          logErr('FileProcess:', `Unknown command type "${cmd}"`);
          throw '';
      }
    })
  }

}

