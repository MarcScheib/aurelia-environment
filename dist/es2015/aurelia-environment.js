import { Parser } from './parser';

let defaultOptions = {
  path: './',
  file: 'aurelia.env'
};

let _options = Object.create(null);

export function load(options) {
  if (typeof fetch === 'undefined') {
    throw new Error('aurelia-environment plugin requires a Fetch API implementation.');
  }

  window.env = Object.create(null);
  _options = Object.assign(Object.create(null), defaultOptions, options);

  return new Promise((resolve, reject) => {
    fetch(new Request(_options.path + _options.file)).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      }

      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }).then(text => {
      let parsedObject = Parser.parse(text);
      Object.keys(parsedObject).forEach(key => {
        window.env[key] = parsedObject[key];
      });
      resolve();
    }).catch(error => {
      reject(error);
    });
  });
}