declare module 'aurelia-environment' {
  export class Parser {
    static parse(content: any): any;
    env: any;
    lineNum: any;
    constructor();
    doParse(content: any): any;
    getLines(content: any): any;
    parseContent(lines: any): any;
    parseLine(line: any): any;
    parseKeyValuePair(line: any): any;
    getEnv(): any;
  }
}