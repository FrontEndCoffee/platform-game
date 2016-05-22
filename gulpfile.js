var gulp = require('gulp')
var browserify = require('browserify')
var tsify = require('tsify')
var source = require('vinyl-source-stream')
var tslint = require('gulp-tslint')
var seq = require('gulp-sequence')

gulp.task('default', (callback) => {
  seq('tslint', 'ts', callback)
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

gulp.task('tslint', () => {
  gulp.src('app/ts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

gulp.task('watch', () => {
  gulp.watch('app/ts/**/*.ts', ['ts'])
})
