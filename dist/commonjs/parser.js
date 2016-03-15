'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Parser = (function () {
  Parser.parse = function parse(content) {
    var parser = new Parser();
    parser.doParse(content);
    return parser.getEnv();
  };

  function Parser() {
    _classCallCheck(this, Parser);

    this.env = {};
    this.lineNum = 0;
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
    this.env = {};
    this.lineNum = 0;
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

      this.lineNum++;
      if (line.startsWith('#') || !line) {
        continue;
      }

      this.parseLine(line);
    }

    return this.env;
  };

  Parser.prototype.parseLine = function parseLine(line) {
    var pair = this.parseKeyValuePair(line);

    this.env[pair.key] = pair.value;
  };

  Parser.prototype.parseKeyValuePair = function parseKeyValuePair(line) {
    var pair = line.split('=', 2);

    if (pair.length !== 2) {
      throw new {
        name: 'ParserException',
        message: 'Could not parse key value pair from line "' + line + '"',
        toString: function toString() {
          return this.name + ': ' + this.message;
        }
      }();
    }

    return {
      key: pair[0],
      value: pair[1]
    };
  };

  Parser.prototype.getEnv = function getEnv() {
    return this.env;
  };

  return Parser;
})();

exports.Parser = Parser;