# Utils

- `copy`, `move`
- `cleanDir`, `cleanDirs`, `ensureDirExists`, `getSubdirs`, `mkdirCyclical`
- `removeForce`, `removeSync`
- `getStats`, `isDirectory`, `chmodCyclical`
- `FileProcess`, `FileJson`

# As Executable

```shell
dwfeFs cmd src [dst] [--hideLog] [--dirPaths] [--fileNames] [--noPrintParams] [--noConfirm]
```

`cmd` – `rmForce` | `cp` | `mv` | `cleanDir` | `cleanDirs`;  
`src`, `dst` – absolute or relative path.

# TODO

- dereference symlinks
- preserveTimestamps When true timestamps from src will be preserved
