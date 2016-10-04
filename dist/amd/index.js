define(['exports', './aurelia-environment'], function (exports, _aureliaEnvironment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaEnvironment).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaEnvironment[key];
      }
    });
  });
});