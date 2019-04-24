import Service from "@vue/cli-service/lib/Service";

import { existsSync } from "fs";
import { join } from "path";
import { IOpts } from "../types";

export default async function build(dir: string, opts: IOpts) {
  const { cwd } = opts;
  const pkgPath = join(cwd, dir);

  const libDir = join(pkgPath, "lib");
  const packagesDir = join(pkgPath, "packages");
  const packagesEntry = join(packagesDir, "index.js");

  if (!existsSync(packagesDir)) {
    return;
  }

  const service = new Service(pkgPath);
  service.run("build", {
    _: ["build", packagesEntry],
    modern: false,
    report: false,
    "report-json": false,
    watch: false,
    open: false,
    copy: false,
    https: false,
    verbose: false,
    clean: false,
    dest: libDir,
    target: "lib",
    formats: "umd-min",
  });
}
