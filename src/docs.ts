import { build, dev } from "@vuepress/core";
import { join } from "path";
import signale from "signale";
import { IOpts } from "./types";

export default async function(opts: IOpts) {
  const { cwd, cmd } = opts;
  const sourceDir = join(cwd, "docs");

  switch (cmd) {
    case "dev":
      dev({ sourceDir, theme: "@vuepress/default" });
      break;
    case "build":
      build({ sourceDir, theme: "@vuepress/default" });
      break;
    default:
      signale.error("Task not found!");
  }
}
