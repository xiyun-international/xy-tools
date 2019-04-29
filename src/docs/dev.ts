import { join } from "path";
import { IOpts } from "../types";

export default async function(dir: string, opts: IOpts) {
  const { cwd } = opts;

  const docsDir = join(cwd, "docs");
  return;
}
