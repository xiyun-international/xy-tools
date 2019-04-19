"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.CONFIG_FILES = void 0;

var _fs = require("fs");

var _utils = require("./utils");

function testDefault(obj) {
  return obj.default || obj;
}

const CONFIG_FILES = ['.xy.library.js', '.xy.library.ts'];
exports.CONFIG_FILES = CONFIG_FILES;

function _default({
  cwd
}) {
  const configFile = (0, _utils.getExistFile)({
    cwd,
    files: CONFIG_FILES
  });

  if ((0, _fs.existsSync)(configFile)) {
    return testDefault(require(configFile));
  } else {
    return {};
  }
}