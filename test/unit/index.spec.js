import {parse} from '../../src/index';

describe('testing load routine', () => {
  it('should parse the string input configure function', () => {
    let content = 'test';
    expect(parse(content)).toEqual(content);
  });
});
