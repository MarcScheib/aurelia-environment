System.register([], function (_export) {
  'use strict';

  var Parser;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      Parser = (function () {
        Parser.parse = function parse(content) {
          var parser = new Parser(content);
          return parser.getEnv();
        };

        function Parser(content) {
          _classCallCheck(this, Parser);

          this.env = [];

          this.doParse(content);
        }

        Parser.prototype.doParse = function doParse(content) {
          var lines = this.getLines(content);
          if (!lines) {
            return;
          }
          return this.parseContent(lines);
        };

        Parser.prototype.getLines = function getLines(content) {
          return content.split('\n');
        };

        Parser.prototype.parseContent = function parseContent(lines) {
          this.lines = [];
          this.line_num = 0;
          for (var _iterator = lines, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var line = _ref;

            this.line_num++;
            if (line.startsWith('#')) {
              continue;
            }
          }

          return this.lines;
        };

        Parser.prototype.getEnv = function getEnv() {
          return this.env;
        };

        return Parser;
      })();

      _export('Parser', Parser);
    }
  };
});