export type TFileProcessCmd = 'clean-dir' | 'copy' | 'move' | 'remove';

export interface ICopyOptions {
  showLog?: boolean;
  skipSystemFiles?: boolean; // Thumbs.db, .DS_Store
  allowedToCopyFilter?: (nextSrcFileName: string, srcFilePath: string, dstFilePath: string) => boolean;
}