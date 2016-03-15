import {Parser} from '../../src/parser';

describe('the parser', () => {
  var sut;
  beforeEach(() => {
    sut = new Parser();
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
});

