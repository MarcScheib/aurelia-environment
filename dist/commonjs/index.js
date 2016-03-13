'use strict';

exports.__esModule = true;
exports.load = load;
exports.parse = parse;
var defaultOptions = {
  path: './',
  file: 'package.json'
};

function isFileApiAvailable() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    return true;
  }

  return false;
}

function load(options) {
  if (isFileApiAvailable() === false) {
    console.log('File api is not available to load the aurelia environment.');
  }

  var _options = Object.assign({}, options, defaultOptions);
  var envFile = new XMLHttpRequest();
  envFile.open('GET', _options.path + _options.file, true);
  envFile.send();
}

function parse(content) {}