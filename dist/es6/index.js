let defaultOptions = {
  path: './src/',
  file: '.env'
};

function isFileApiAvailable() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    return true;
  }

  return false;
}

export function load(options : any) {
  if (isFileApiAvailable() === false) {
    console.log('File api is not available to load the aurelia environment.');
  }

  let _options = Object.assign({}, options, defaultOptions);
  let envFile = new XMLHttpRequest();
  envFile.open("GET", _options.path + _options.file, false);
  envFile.send();
}

export function parse(content : string) {

}
