'use strict';

System.register(['./parser'], function (_export, _context) {
  var Parser, defaultOptions;
  return {
    setters: [function (_parser) {
      Parser = _parser.Parser;
    }],
    execute: function () {
      defaultOptions = {
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
                var parsedObject = Parser.parse(xhr.response);
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

      _export('load', load);
    }
  };
});