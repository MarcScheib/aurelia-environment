System.register([], function (_export) {
  'use strict';

  var defaultOptions;

  _export('load', load);

  _export('parse', parse);

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
    envFile.open("GET", _options.path + _options.file, false);
    envFile.send();
  }

  function parse(content) {}

  return {
    setters: [],
    execute: function () {
      defaultOptions = {
        path: './src/',
        file: '.env'
      };
    }
  };
});