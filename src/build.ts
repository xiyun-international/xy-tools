import { join } from 'path';
import { IOpts } from './types';
import { readdirSync } from 'fs';
import { isLerna } from './utils';

import buildTheme from './build/theme';
import buildComponent from './build/component';

export default async function(opts: IOpts) {
  const { cwd, cmd } = opts;

  const build = cmd === 'theme' ? buildTheme : buildComponent;

  if (isLerna(cwd)) {
    const dirs = readdirSync(join(cwd, 'packages'));
    dirs.forEach(pkg => {
      build(`./packages/${pkg}`, { cwd });
    });
  } else {
    build('./', { cwd });
  }
}
