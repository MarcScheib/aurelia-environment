export class Parser {
  static parse(content) {
    let parser = new Parser(content);
    return parser.getEnv();
  }

  env = [];

  constructor(content) {
    this.doParse(content);
  }

  doParse(content) {
    let lines = this.getLines(content);
    if (!lines) {
      return;
    }
    return this.parseContent(lines);
  }

  getLines(content) {
    return content.split('\n');
  }

  parseContent(lines) {
    this.lines = [];
    this.line_num = 0;
    for (let line of lines) {
      this.line_num++;
      if (line.startsWith('#')) {
        continue;
      }

      //this.parseLine(line);
    }

    return this.lines;
  }

  getEnv() {
    return this.env;
  }
}
