declare module 'aurelia-environment' {
  
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
    static parse(content: string): any;
    
    /**
       * Environment object containing the parsed key-value-pairs of this Parser
       * object.
       */
    env: any;
    
    /**
       * The number of lines parsed by this object.
       */
    lineNum: number;
    constructor();
    
    /**
       * Parses the given content and returns the parsed environment object.
       *
       * @param content - content to parse
       */
    doParse(content: string): any;
    
    /**
       * Splits the given string by line breaks and returns the array of lines.
       *
       * @param content - content to split by line endings
       */
    getLines(content: string): string[];
    
    /**
       * Parses the given array of strings. If a line starts with a #, it will be
       * treated as a comment. Otherwise, the line will handed over to line parsing.
       *
       * @param lines - array of lines
       */
    parseContent(lines: string[]): any;
    
    /**
       * Parses the given line and sets the resulting key-value pair as an
       * environment object property.
       *
       * @param line - the line reflecting a key-value pair
       */
    parseLine(line: string): void;
    
    /**
       * Splits the given line by = and verifies that a key and a value exist.
       * Returns the key-value pair as an object.
       *
       * @param line - key-value pair as a string
       * @throws ParserException
       */
    parseKeyValuePair(line: string): any;
    
    /**
       * Returns the environment object.
       */
    getEnv(): any;
  }
}