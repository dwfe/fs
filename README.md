# Utils

- `copy`, `move`
- `cleanDir`, `cleanDirs`, `ensureDirExists`, `getSubdirs`, `mkdirCyclical`, `traverseDir`
- `removeForce`, `removeSync`
- `getStats`, `isDirectory`, `chmodCyclical`
- `FileProcess`, `FileJson`

# As Executable

```shell
dwfeFs cmd src [dst] [--dirPaths] [--fileNames] [--noPrintParams] [--noConfirm] [--hideLog]
```

- `cmd` – `rmForce` | `cp` | `mv` | `cleanDir` | `cleanDirs`;
- `src`, `dst` – absolute or relative path;
- `--dirPaths`, `--fileNames` – list of directories(file names). The list must be enclosed in quotation marks, and the symbol `;` should be used as the separator of the items, for example: `--dirPaths=";/Users/z;src/tests;app/*"`;
- `--dirPaths` – if there is a path ending in '*' in the `--dirPaths` list. Then only the first-level subdirectories relative to this path will be included in the resulting list.

# TODO

- dereference symlinks
- preserveTimestamps When true timestamps from src will be preserved
