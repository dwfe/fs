import {Dirent, Stats} from 'fs';

export type TFileProcessCmd = 'rmForce' | 'cp' | 'mv' | 'cleanDir';

export interface ICommonOpt {
  showLog?: boolean;
  stats?: Stats | Dirent;
}

export interface ICopyOpt extends ICommonOpt {
  skipSystemFiles?: boolean; // Thumbs.db, .DS_Store
  allowedToCopyFilter?: (nextSrcFileName: string, srcFilePath: string, dstFilePath: string) => boolean;
  srcStats?: Stats | Dirent;
}

export interface ICleanDirOpt extends ICommonOpt {
  fileNamesToRemove?: string[];
  allowedToRemoveFilter?: (nextFileName: string, path: string) => boolean;
}

export interface IEnsureDirExistsOpt extends ICommonOpt {
  afterCreatingDir?: () => void;
}

export interface IRemoveOptions extends ICommonOpt {
  force?: boolean;
}
