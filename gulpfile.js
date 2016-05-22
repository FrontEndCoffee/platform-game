var gulp = require('gulp')
var browserify = require('browserify')
var tsify = require('tsify')
var source = require('vinyl-source-stream')
var tslint = require('gulp-tslint')
var seq = require('gulp-sequence')
var del = require('del')

// development related tasks

gulp.task('default', (callback) => {
  seq('ts', callback)
})

gulp.task('watch', () => {
  gulp.watch('app/ts/**/*.ts', ['ts'])
})

gulp.task('ts', () => {
  return browserify({
    baseDir: '.',
    debug: true,
    entries: ['app/ts/app.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('app/js'))
})

// test related tasks

gulp.task('test', (callback) => {
  seq('test:tslint', callback)
})

gulp.task('test:tslint', () => {
  gulp.src('app/ts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

// build related tasks

gulp.task('build', ['test'], (callback) => {
  seq('build:clean', 'build:html', 'build:ts', callback)
})

gulp.task('build:clean', () => {
  return del(
    'dest/**/*'
  )
})

gulp.task('build:html', () => {
  gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('dist'))
})

gulp.task('build:ts', () => {
  return browserify({
    baseDir: '.',
    debug: false,
    entries: ['app/ts/app.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/js'))
})
