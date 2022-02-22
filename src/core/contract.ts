import {Dirent, Stats} from 'fs';

export type TStats = Stats | Dirent;

export interface ICommonOpt {
  showLog?: boolean;
  stats?: TStats;
}

export interface ICopyOpt extends ICommonOpt {
  skipSystemFiles?: boolean; // Thumbs.db, .DS_Store
  allowedToCopyFilter?: (nextSrcFileName: string, srcFilePath: string, dstFilePath: string) => boolean;
  srcStats?: TStats;
}

export interface ICleanDirOpt extends ICommonOpt, IValidateOpt {
  fileNamesToRemove?: string[];
  allowedToRemoveFilter?: (nextFileName: string, path: string) => boolean;
}

export interface IEnsureDirExistsOpt extends ICommonOpt {
  afterCreatingDir?: () => void;
}

export interface IRemoveOpt extends ICommonOpt {
  force?: boolean;
}


export interface IValidateOpt {
  skipCheck?: boolean;
  skipExistsCheck?: boolean;
}


//region FileProcess

export type TFileProcessCmd = 'rmForce' | 'cp' | 'mv' | 'cleanDir' | 'cleanDirs';

export interface IFileProcessOpt extends ICommonOpt {
  dirPaths?: string[];
  fileNames?: string[];
  printParams?: boolean;
}

export type TFileProcessTask = [TFileProcessCmd, [string, string?], IFileProcessOpt];

//endregion


//region TraverseDir

export interface ITraverseDirOpt {
  callback: (args: ITraverseDirCallbackArgs) => void;
  maxLevel: number;
}

export interface ITraverseDirCallbackArgs {
  iFilePath: string;
  iStats: Dirent;
  iPath: string;
}

//endregion
