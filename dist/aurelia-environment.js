
/**
 * An .env file content parser.
 */
export class Parser {
  /**
   * Parser function which can easily called to initialize the Parser and start
   * parsing the given string. It directly returns the resulting environment.
   *
   * @param content - The content string that will be parsed.
   */
  static parse(content: string): any {
    let parser = new Parser();
    parser.doParse(content);
    return parser.getEnv();
  }

  /**
   * Environment object containing the parsed key-value-pairs of this Parser
   * object.
   */
  env: any = {};

  /**
   * The number of lines parsed by this object.
   */
  lineNum: number = 0;

  constructor() {
  }

  /**
   * Parses the given content and returns the parsed environment object.
   *
   * @param content - content to parse
   */
  doParse(content: string): any {
    let lines = this.getLines(content);
    return this.parseContent(lines);
  }

  /**
   * Splits the given string by line breaks and returns the array of lines.
   *
   * @param content - content to split by line endings
   */
  getLines(content: string): string[] {
    return content.split('\n');
  }

  /**
   * Parses the given array of strings. If a line starts with a #, it will be
   * treated as a comment. Otherwise, the line will handed over to line parsing.
   *
   * @param lines - array of lines
   */
  parseContent(lines: string[]): any {
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

  /**
   * Parses the given line and sets the resulting key-value pair as an
   * environment object property.
   *
   * @param line - the line reflecting a key-value pair
   */
  parseLine(line: string): void {
    let pair = this.parseKeyValuePair(line);

    this.env[pair.key] = pair.value;
  }

  /**
   * Splits the given line by = and verifies that a key and a value exist.
   * Returns the key-value pair as an object.
   *
   * @param line - key-value pair as a string
   * @throws ParserException
   */
  parseKeyValuePair(line: string): any {
    let pair = line.split('=');

    if (pair.length !== 2) {
      throw new Error('Could not parse key value pair from line "' + line + '"');
    }

    let key = pair[0];
    let value = this.stripComments(pair[1]);

    return {
      key: key,
      value: value
    };
  }

  /**
   * Strips comments from a value.
   *
   * @param value - the value to strip comments from
   */
  stripComments(value: string): string {
    let values = value.split('#');
    return values[0].trim();
  }

  /**
   * Returns the environment object.
   */
  getEnv(): any {
    return this.env;
  }
}
