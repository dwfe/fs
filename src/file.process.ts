import {TFileProcessCmd} from './contract'
import {cleanDir} from './directory';
import {copySync} from './copy-sync';
import {removeSync} from './common';
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
          console.log(`> delete path '${src}' \r\n`)
          return;
        default:
          throw new Error(`unknown command type '${cmd}'`);
      }
    })
  }

}

