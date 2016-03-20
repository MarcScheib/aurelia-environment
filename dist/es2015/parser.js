export let Parser = class Parser {
  static parse(content) {
    let parser = new Parser();
    parser.doParse(content);
    return parser.getEnv();
  }

  constructor() {
    this.env = {};
    this.lineNum = 0;
  }

  doParse(content) {
    let lines = this.getLines(content);
    if (!lines) {
      return {};
    }

    return this.parseContent(lines);
  }

  getLines(content) {
    return content.split('\n');
  }

  parseContent(lines) {
    this.env = {};
    this.lineNum = 0;
    for (let line of lines) {
      this.lineNum++;
      if (line.startsWith('#') || !line) {
        continue;
      }

      this.parseLine(line);
    }

    return this.env;
  }

  parseLine(line) {
    let pair = this.parseKeyValuePair(line);

    this.env[pair.key] = pair.value;
  }

  parseKeyValuePair(line) {
    let pair = line.split('=', 2);

    if (pair.length !== 2) {
      throw new {
        name: 'ParserException',
        message: 'Could not parse key value pair from line "' + line + '"',
        toString: function () {
          return this.name + ': ' + this.message;
        }
      }();
    }

    return {
      key: pair[0],
      value: pair[1]
    };
  }

  getEnv() {
    return this.env;
  }
};