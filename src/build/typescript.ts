import { IOpts } from "../types";
import { fork } from "child_process";

export default async function build(opts: IOpts) {
  const { args } = opts;

  let params = ["build"];
  if (args.watch) {
    params = params.concat(["--watch", "true"]);
  }

  const binPath = require.resolve("umi-tools/cli.js");
  fork(binPath, params);
}
