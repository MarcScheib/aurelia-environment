import {load} from '../../src/index';

describe('the environment load routine', () => {
  let originalFetch = window.fetch;
  let fetch;

  beforeEach(() => {
    fetch = window.fetch = jasmine.createSpy('fetch');
  });

  afterEach(() => {
    fetch = window.fetch = originalFetch;
  });

  it('should error on missing fetch implementation', () => {
    window.fetch = undefined;
    expect(() => load()).toThrow();
  });

  it('should reject on missing environment file', done => {
    let response = new Response(null, { status: 500 });
    fetch.and.returnValue(Promise.resolve(response));

    load({file: 'notExisting.env'})
      .then(() => {
        expect(true).not.toBe(true);
      })
      .catch(error => {
        expect(error.status).toBeDefined();
        expect(error.statusText).toBeDefined();
      })
      .then(() => {
        expect(fetch).toHaveBeenCalled();
        done();
      });
  });

  it('should specify the environment', done => {
    let response = new Response('key=value', { status: 200 });
    fetch.and.returnValue(Promise.resolve(response));

    load({file: '.env'})
      .then(() => {
        expect(window.env).toBeDefined();
        expect(window.env.key).toEqual('value');
      })
      .catch(error => {
        expect(error).not.toBe(error);
      })
      .then(() => {
        expect(fetch).toHaveBeenCalled();
        done();
      });
  });
});
