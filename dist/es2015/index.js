import { Parser } from './parser';

let defaultOptions = {
  path: './',
  file: 'aurelia.env'
};

export function load(options) {
  window.env = {};
  let _options = Object.assign({}, defaultOptions, options);

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', _options.path + _options.file);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        let parsedObject = Parser.parse(xhr.response);
        Object.keys(parsedObject).forEach(key => {
          window.env[key] = parsedObject[key];
        });
        resolve();
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}