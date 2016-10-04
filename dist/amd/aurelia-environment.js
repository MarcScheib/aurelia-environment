define(['exports', './parser'], function (exports, _parser) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.load = load;


  var defaultOptions = {
    path: './',
    file: 'aurelia.env'
  };

  var _options = Object.create(null);

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
        var parsedObject = _parser.Parser.parse(text);
        Object.keys(parsedObject).forEach(function (key) {
          window.env[key] = parsedObject[key];
        });
        resolve();
      }).catch(function (error) {
        reject(error);
      });
    });
  }
});