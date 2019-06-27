import { fork } from "child_process";
import { IOpts } from "./types";

export default async function(opts: IOpts) {
  const { cwd, cmd } = opts;

  const binPath = require.resolve("vuepress/cli.js");
  if (cmd === "dev") {
    fork(binPath, ["dev", "docs"]);
  } else if (cmd === "build") {
    fork(binPath, ["docs", "build"]);
  }
}
