define(['exports', './parser'], function (exports, _parser) {
  'use strict';

  exports.__esModule = true;
  exports.load = load;

  var defaultOptions = {
    path: './',
    file: 'aurelia.env'
  };

  function load(options) {
    window.env = {};
    var _options = Object.assign({}, options, defaultOptions);

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', _options.path + _options.file);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          (function () {
            var parsedObject = _parser.Parser.parse(xhr.response);
            Object.keys(parsedObject).forEach(function (key) {
              window.env[key] = parsedObject[key];
            });

            resolve();
          })();
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send();
    });
  }
});