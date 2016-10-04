define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Parser = exports.Parser = function () {
    Parser.parse = function parse(content) {
      var parser = new Parser();
      parser.doParse(content);
      return parser.getEnv();
    };

    function Parser() {
      

      this.env = {};
      this.lineNum = 0;
    }

    Parser.prototype.doParse = function doParse(content) {
      var lines = this.getLines(content);
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
      var pair = line.split('=');

      if (pair.length !== 2) {
        throw new Error('Could not parse key value pair from line "' + line + '"');
      }

      var key = pair[0].trim();
      var value = this.stripComments(pair[1]);

      return {
        key: key,
        value: value
      };
    };

    Parser.prototype.stripComments = function stripComments(value) {
      var values = value.split(' #');
      return values[0].trim();
    };

    Parser.prototype.getEnv = function getEnv() {
      return this.env;
    };

    return Parser;
  }();
});