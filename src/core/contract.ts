import {Dirent, Stats} from 'fs';

export type TFileProcessCmd = 'rmForce' | 'cp' | 'mv' | 'cleanDir';

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

export interface IRemoveOptions extends ICommonOpt {
  force?: boolean;
}


export interface IValidateOpt {
  skipCheck?: boolean;
  skipExistsCheck?: boolean;
}
