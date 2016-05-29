var gulp = require('gulp')
var browserify = require('browserify')
var tsify = require('tsify')
var source = require('vinyl-source-stream')
var tslint = require('gulp-tslint')
var seq = require('gulp-sequence')
var del = require('del')
var typescript = require('gulp-typescript')
var tape = require('gulp-tape')
var tapColorize = require('tap-colorize')

// development related tasks

gulp.task('default', (callback) => {
  seq('ts', callback)
})

gulp.task('watch', ['ts'], () => {
  gulp.watch('app/ts/**/*.ts', ['ts'])
})

gulp.task('ts', () => {
  return browserify({
    baseDir: '.',
    debug: true,
    entries: ['app/ts/main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle().on('error', function (e) {
      console.error("|====================================================|")
      console.error("| WARNING: ts line failed, Syntax errors in ts files |")
      console.error("|====================================================|")
      console.error(e)
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('app/js'))
})

// test related tasks

gulp.task('test', (callback) => {
  return seq('test:tslint', 'test:unit', callback)
})

gulp.task('test:unit', (callback) => {
  return seq('test:unit:clean', 'test:unit:compile', 'test:unit:test', callback)
})

gulp.task('test:unit:clean', () => {
  return del('test/temp/**/*.js')
})

gulp.task('test:unit:compile', () => {
  return gulp.src('app/ts/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('test/temp'))
})

gulp.task('test:unit:test', () => {
  return gulp.src('test/**/*.spec.js')
    .pipe(tape({
      reporter: tapColorize()
    }))
})

gulp.task('test:tslint', () => {
  return gulp.src('app/ts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

// build related tasks

gulp.task('build', ['test'], (callback) => {
  return seq('build:clean', 'build:html', 'build:ts', callback)
})

gulp.task('build:clean', () => {
  return del('dest/**/*')
})

gulp.task('build:html', () => {
  return gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('dist'))
})

gulp.task('build:ts', () => {
  return browserify({
    baseDir: '.',
    debug: false,
    entries: ['app/ts/main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
})
