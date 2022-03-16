#!/usr/bin/env node

import {logAction} from '@do-while-for-each/log-node';
import {FileProcess, printTask} from './core/file.process';
import {parseArgs} from './executable/parse-args';
import {TFileProcessTask} from './core/contract';
import {question} from './executable/confirm';

const {cmd, src, dst, dirPaths, fileNames, needToConfirm, printParams, showLog} = parseArgs();

const task: TFileProcessTask = [cmd, [src, dst], {dirPaths, fileNames, printParams, showLog}];
printTask(task);
task[2].printParams = false;

const run = () => FileProcess.run([task]);

if (needToConfirm) {
  question('Do you want to continue? [y/n] ', answer => {
    if (answer === 'y')
      run();
    else
      logAction(`skip "${cmd}"`);
  })
} else
  run();
