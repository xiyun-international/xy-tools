"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.build = build;

var _gulp = _interopRequireDefault(require("gulp"));

var _signale = _interopRequireDefault(require("signale"));

var _path = require("path");

var _build2 = require("./gulp/build");

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
      const dirs = (0, _fs.readdirSync)((0, _path.join)(cwd, "packages"));
      dirs.forEach(pkg => build(`./packages/${pkg}`, {
        cwd
      }));
    } else {
      build("./", {
        cwd
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
    const themeDir = (0, _path.join)(pkgPath, "theme"); // 编译 Gulp

    if ((0, _fs.existsSync)(themeDir)) {
      // Todo: 改造成 .xy.library.js
      const type = themeDir.indexOf("element-ui") === -1 ? "less" : "scss";
      (0, _build2.buildCss)(type, {
        themeDir,
        libDir
      });

      const taskInstance = _gulp.default.task(type);

      if (taskInstance === undefined) {
        _signale.default.error("Task not found!");

        return;
      }

      try {
        taskInstance.apply(_gulp.default);

        _signale.default.success(`Run task ${dir}`);
      } catch (err) {
        _signale.default.error(err);
      }
    }
  });
  return _build.apply(this, arguments);
}