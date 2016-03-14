let defaultOptions = {
  path: './',
  file: 'aurelia.env'
};

export function load(options) {
  window.env = {};
  let _options = Object.assign({}, options, defaultOptions);

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', _options.path + _options.file);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        let parsedObject = parse(xhr.response);
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

    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();
  });
}

function parse(content) {
  let obj = {};

  content.split('\n').forEach(line => {
    let keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (keyValueArr !== null) {
      let key = keyValueArr[1];
      let value = keyValueArr[2] ? keyValueArr[2] : '';
      let len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
        value = value.replace(/\\n/gm, '\n');
      }
      value = value.replace(/(^['"]|['"]$)/g, '').trim();

      obj[key] = value;
    }
  });

  return obj;
}
