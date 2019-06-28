import { readdirSync } from "fs";
import { join } from "path";
import { isLerna } from "./utils";
import { IOpts } from "./types";

const path = require("path");
const jest = require("jest");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
console.log(process.cwd());
const config = _objectSpread({
  //   rootDir: process.cwd(),
  transform: {
    "\\.(t|j)sx?$": require.resolve("ts-jest"),
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ["**/?*.(spec|test|e2e).(j|t)s?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  testPathIgnorePatterns: ["/node_modules/"],
});
export default async function(opts: IOpts) {
  const { cwd, cmd } = opts; ///Users/yue.yu/Documents/xiyun/xy component
  if (isLerna(cwd)) {
    const pkgs = readdirSync(join(cwd, "packages"));
    const single = cmd["_"][0];
    if (single) {
      await run(single, cmd);
    } else {
      for (const pkg of pkgs) {
        await run(pkg, cmd);
      }
    }
  }
}
async function run(pkg, cmd) {
  console.log(pkg);
  new Promise((resolve, reject) => {
    jest
      .runCLI(
        //options, options["projects"]
        _objectSpread({
          config: JSON.stringify(config),
          ...cmd,
          all: true,
          colors: true,
          //   runInBand: true,
        }),
        [`./packages/${pkg}`]
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
