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
    const pkgs = readdirSync(join(cwd, 'packages'));
    for (const pkg of pkgs) {
      await build(`./packages/${pkg}`, { cwd });
    }
  } else {
    await build('./', { cwd });
  }
}
