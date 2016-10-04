'use strict';

System.register(['./parser'], function (_export, _context) {
  "use strict";

  var Parser, defaultOptions, _options;

  function load(options) {
    if (typeof fetch === 'undefined') {
      throw new Error('aurelia-environment plugin requires a Fetch API implementation.');
    }

    window.env = Object.create(null);
    _options = Object.assign(Object.create(null), defaultOptions, options);

    return new Promise(function (resolve, reject) {
      fetch(new Request(_options.path + _options.file)).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        }

        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        });
      }).then(function (text) {
        var parsedObject = Parser.parse(text);
        Object.keys(parsedObject).forEach(function (key) {
          window.env[key] = parsedObject[key];
        });
        resolve();
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  _export('load', load);

  return {
    setters: [function (_parser) {
      Parser = _parser.Parser;
    }],
    execute: function () {
      defaultOptions = {
        path: './',
        file: 'aurelia.env'
      };
      _options = Object.create(null);
    }
  };
});