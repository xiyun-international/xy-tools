import { readdirSync } from "fs";
import { join } from "path";
import { IOpts } from "./types";
import { isLerna } from "./utils";

import buildDoc from "./docs/build";
import devDoc from "./docs/dev";

export default async function(opts: IOpts) {
  const { cwd, cmd } = opts;

  const build = cmd === "dev" ? devDoc : buildDoc;

  if (isLerna(cwd)) {
    const pkgs = readdirSync(join(cwd, "packages"));
    for (const pkg of pkgs) {
      await build(`./packages/${pkg}`, { cwd });
    }
  } else {
    await build("./", { cwd });
  }
}
