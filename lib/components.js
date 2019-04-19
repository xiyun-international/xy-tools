"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.build = build;

var _cliService = _interopRequireDefault(require("@vue/cli-service"));

var _path = require("path");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* (opts) {
    const cwd = opts.cwd;

    if (isLerna(cwd)) {
      const packages = (0, _path.join)(cwd, "packages");
      const dirs = (0, _fs.readdirSync)(packages);
      dirs.forEach(pkg => {
        build(`./packages/${pkg}`, {
          cwd
        });
      });
    }
  });
  return _ref.apply(this, arguments);
}

function isLerna(cwd) {
  return (0, _fs.existsSync)((0, _path.join)(cwd, "lerna.json"));
}

function build(_x2, _x3) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* (dir, opts) {
    const cwd = opts.cwd;
    const pkgPath = (0, _path.join)(cwd, dir);
    const libDir = (0, _path.join)(pkgPath, "lib");
    const packagesDir = (0, _path.join)(pkgPath, "packages");
    const packagesEntry = (0, _path.join)(packagesDir, "index.js");

    if (!(0, _fs.existsSync)(packagesDir)) {
      return;
    }

    const service = new _cliService.default(pkgPath);
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
      formats: "umd-min"
    });
  });
  return _build.apply(this, arguments);
}