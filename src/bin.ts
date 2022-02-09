#!/usr/bin/env node

import {ARGS, findArg, normalizePath} from './executable/params';
import {FileProcess} from './core/file.process';
import {TFileProcessCmd} from './core/contract';

const cmd = ARGS[0] as TFileProcessCmd;
const src = normalizePath(ARGS[1]);
const dst = normalizePath(ARGS[1]);
const showLog = !findArg('--hideLog');

FileProcess.run([[cmd, [src, dst], showLog]])
