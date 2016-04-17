import {Parser} from "../../src/parser";

describe('the parser', () => {
  var sut;
  beforeEach(() => {
    sut = new Parser();
  });

  it('should provide static access to parser', () => {
    spyOn(Parser.prototype, 'doParse');
    let env = Parser.parse(`ENV1=value3`);
    expect(Parser.prototype.doParse).toHaveBeenCalled();
  });

  it('should return empty env on empty content', () => {
    let env = sut.doParse('');
    expect(env).toEqual({});
  });

  it('should throw an exception on wrong assignment syntax', () => {
    try {
      sut.doParse(`ENV1=value3=value2`);
      expect(true).not.toBe(true);
    } catch(err) {
      expect(err.message).toEqual('Could not parse key value pair from line "ENV1=value3=value2"');
    }
  });

  it('should return simple values', () => {
    sut.doParse(`ENV1=value3\nENV2=value2\nENV3=value1`);

    let expected = {
      ENV1: 'value3',
      ENV2: 'value2',
      ENV3: 'value1'
    };

    expect(sut.getEnv()).toEqual(expected);
  });

  it('should ignore comments', () => {
    sut.doParse(`#ENV1=value3\n#ENV2=value2\nENV3=value1`);

    let expected = {
      ENV3: 'value1'
    };

    expect(sut.getEnv()).toEqual(expected);
  });

  it('should strip inline comments', () => {
    sut.doParse(`ENV1=value3#test\nENV2=value2 # test\nENV3=value1  #test`);

    let expected = {
      ENV1: 'value3',
      ENV2: 'value2',
      ENV3: 'value1'
    };

    expect(sut.getEnv()).toEqual(expected);
  });
});

