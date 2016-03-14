declare module 'aurelia-environment' {
  export class Parser {
    static parse(content: any): any;
    env: any;
    constructor(content: any);
    doParse(content: any): any;
    getLines(content: any): any;
    parseContent(lines: any): any;
    getEnv(): any;
  }
}