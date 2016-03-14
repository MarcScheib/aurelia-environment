System.register([], function (_export) {
  'use strict';

  var defaultOptions;

  _export('load', load);

  function load(options) {
    window.env = {};
    var _options = Object.assign({}, options, defaultOptions);

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', _options.path + _options.file);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          (function () {
            var parsedObject = parse(xhr.response);
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

  function parse(content) {
    var obj = {};

    content.split('\n').forEach(function (line) {
      var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
      if (keyValueArr !== null) {
        var key = keyValueArr[1];
        var value = keyValueArr[2] ? keyValueArr[2] : '';
        var len = value ? value.length : 0;
        if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
          value = value.replace(/\\n/gm, '\n');
        }
        value = value.replace(/(^['"]|['"]$)/g, '').trim();

        obj[key] = value;
      }
    });

    return obj;
  }
  return {
    setters: [],
    execute: function () {
      defaultOptions = {
        path: './',
        file: 'aurelia.env'
      };
    }
  };
});