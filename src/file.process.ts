import {logErr} from '@do-while-for-each/log-node';
import {copySync} from './copy-sync/copy-sync';
import {TFileProcessCmd} from './contract';
import {removeSync} from './remove-sync';
import {cleanDir} from './directory';
import {moveSync} from './move-sync';

export class FileProcess {

  static run(tasks: Array<[TFileProcessCmd, [string, string?], boolean]>) {
    tasks.forEach(([cmd, [src, dest], showLog]) => {
      switch (cmd) {
        case 'clean-dir':
          cleanDir(src, showLog);
          return;
        case 'move':
          moveSync(src, dest as string, {showLog});
          return;
        case 'copy':
          copySync(src, dest as string, {showLog});
          return;
        case 'remove':
          removeSync(src, showLog);
          return;
        default:
          logErr('FileProcess:', `Unknown command type '${cmd}'`);
          throw '';
      }
    })
  }

}

