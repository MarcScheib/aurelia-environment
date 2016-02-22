var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var changelog = require('gulp-conventional-changelog');
var fs = require('fs');
var bump = require('gulp-bump');
var args = require('../args');

gulp.task('bump-version', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: args.bump})) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', function () {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return gulp.src(paths.doc + '/CHANGELOG.md', {
      buffer: false
    })
    .pipe(changelog({
      preset: 'angular',
      repository: pkg.repository.url,
      version: pkg.version
    }))
    .pipe(gulp.dest(paths.doc + '/'));
});

gulp.task('prepare-release', function (callback) {
  return runSequence(
    'build',
    'lint',
    'bump-version',
    'doc',
    'changelog',
    callback
  );
});
