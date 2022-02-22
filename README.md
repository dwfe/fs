# Utils

- `copy`, `move`
- `cleanDir`, `cleanDirs`, `ensureDirExists`, `getSubdirs`, `mkdirCyclical`, `traverseDir`
- `removeForce`, `removeSync`
- `getStats`, `isDirectory`, `chmodCyclical`
- `FileProcess`, `FileJson`

# As Executable

```shell
dwfeFs cmd src [dst] [--hideLog] [--dirPaths] [--fileNames] [--noPrintParams] [--noConfirm]
```

- `cmd` – `rmForce` | `cp` | `mv` | `cleanDir` | `cleanDirs`;
- `src`, `dst` – absolute or relative path;
- `--dirPaths`, `--fileNames` – list of directories(file names). The list must be enclosed in quotation marks, and the symbol `;` should be used as the separator of the items, for example: `--dirPaths=";/Users/z;dist/src"`

# TODO

- dereference symlinks
- preserveTimestamps When true timestamps from src will be preserved
