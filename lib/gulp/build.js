"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildCss = buildCss;

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpLess = _interopRequireDefault(require("gulp-less"));

var _gulpSass = _interopRequireDefault(require("gulp-sass"));

var _gulpCssmin = _interopRequireDefault(require("gulp-cssmin"));

var _gulpAutoprefixer = _interopRequireDefault(require("gulp-autoprefixer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function buildCss(_x, _x2) {
  return _buildCss.apply(this, arguments);
}

function _buildCss() {
  _buildCss = _asyncToGenerator(function* (type, outputOpts) {
    _gulp.default.task(type, () => {
      build(type, outputOpts);
    });
  });
  return _buildCss.apply(this, arguments);
}

function build(type, outputOpts) {
  const themeDir = outputOpts.themeDir,
        libDir = outputOpts.libDir; // SASS、Less

  _gulp.default.src(`${themeDir}/styles/index.${type}`).pipe(type === "scss" ? (0, _gulpSass.default)().on("error", _gulpSass.default.logError) : (0, _gulpLess.default)()).pipe((0, _gulpAutoprefixer.default)({
    browsers: ["ie > 9", "last 2 versions"],
    cascade: false
  })).pipe((0, _gulpCssmin.default)()).pipe(_gulp.default.dest(libDir));

  console.dir(themeDir); // Font

  _gulp.default.src(`${themeDir}/fonts/xy.*`).pipe(_gulp.default.dest(`${libDir}/fonts/`));
}