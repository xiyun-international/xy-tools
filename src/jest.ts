import { readdirSync } from "fs";
import { join } from "path";
import { isLerna } from "./utils";
import { IOpts } from "./types";

const path = require("path");
const jest = require("jest");

const config = {
  //   rootDir: process.cwd(),
  transform: {
    "\\.(t|j)sx?$": require.resolve("ts-jest"),
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ["**/?*.(spec|test|e2e).(j|t)s?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  testPathIgnorePatterns: ["/node_modules/"],
};
export default async function(opts: IOpts) {
  const { cwd, cmd } = opts;
  if (isLerna(cwd)) {
    const pkgs = readdirSync(join(cwd, "packages"));
    const single = cmd["_"][0];
    if (single) {
      await run(single, cmd);
    } else {
      await run("all", cmd);
    }
  }
}
async function run(pkg, cmd) {
  let pkgUrl = "";
  if (pkg === "all") {
    pkgUrl = "./packages";
  } else {
    pkgUrl = `./packages/${pkg}`;
  }
  new Promise((resolve, reject) => {
    jest
      .runCLI(
        {
          config: JSON.stringify(config),
          ...cmd,
          all: true,
          colors: true,
          //   runInBand: true,
        },
        [pkgUrl]
      )
      .then(result => {
        const results = result.results;

        if (results.success) {
          resolve();
        } else {
          reject(new Error("Jest failed"));
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
}
