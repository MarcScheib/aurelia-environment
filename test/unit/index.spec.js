import {load} from '../../src/index';

describe('the environment load routine', () => {
  beforeEach(() => {
    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');
  });

  it('should request environment file', done => {
    load();
    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    done();
  });
});
