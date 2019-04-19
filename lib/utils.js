"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExistFile = getExistFile;
exports.getProjectPath = getProjectPath;
exports.resolve = resolve;

var _fs = require("fs");

var _path = require("path");

const cwd = process.cwd();
/**
 * 检测文件是否存在
 * @param object
 */

function getExistFile({
  cwd,
  files
}) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const file = _step.value;
      const absFilePath = (0, _path.join)(cwd, file);

      if ((0, _fs.existsSync)(absFilePath)) {
        return file;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function getProjectPath(...filePath) {
  return (0, _path.join)(cwd, ...filePath);
}

function resolve(moduleName) {
  return require.resolve(moduleName);
}