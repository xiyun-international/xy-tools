import { existsSync } from 'fs';
import { join } from 'path';

export function isLerna(cwd: any) {
  return existsSync(join(cwd, "lerna.json"));
}

/**
 * 检测文件是否存在
 * @param object
 */
export function getExistFile({ cwd, files }) {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return file;
    }
  }
}
