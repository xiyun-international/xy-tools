import { readdirSync } from "fs";
import { join } from "path";
import { IOpts } from "./types";
import { isLerna } from "./utils";

import buildComponent from "./build/component";
import buildTheme from "./build/theme";

export default async function(opts: IOpts) {
  const { cwd, cmd } = opts;

  const build = cmd === "theme" ? buildTheme : buildComponent;

  if (isLerna(cwd)) {
    const pkgs = readdirSync(join(cwd, "packages"));
    for (const pkg of pkgs) {
      await build(`./packages/${pkg}`, { cwd });
    }
  } else {
    await build("./", { cwd });
  }
}
