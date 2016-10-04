'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaEnvironment = require('./aurelia-environment');

Object.keys(_aureliaEnvironment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaEnvironment[key];
    }
  });
});