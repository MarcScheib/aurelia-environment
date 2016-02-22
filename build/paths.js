var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  output: 'dist/',
  sample: 'sample',
  doc:'./doc',
  tests: 'test/**/*.js',
  packageName: pkg.name
};
