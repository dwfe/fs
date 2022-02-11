import {existsSync, PathLike, readFileSync, writeFileSync} from 'fs';

export class FileJson {

  static read<T>(path: PathLike): T {
    return existsSync(path)
      ? JSON.parse(readFileSync(path, 'utf8'))
      : {}
  }

  static write(data: any, path: string, isPretty = false): void {
    const json = isPretty
      ? JSON.stringify(data, null, 2)
      : JSON.stringify(data);
    writeFileSync(path, json, 'utf8');
  }

}
