var gulp = require('gulp')
var clean = require('gulp-clean')
var gulpSequence = require('gulp-sequence')
var eslint = require('gulp-eslint')
var gulpIf = require('gulp-if')
var useref = require('gulp-useref')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var webserver = require('gulp-webserver')
var eslintrc = require('./.eslintrc.json')

gulp.task('run', ['babel'], () => {
  gulp
  .src('app')
  .pipe(webserver({open: true}))

})

gulp.task('watch', () => {
  gulp.watch('app/es6/**/*.js', ['js'])
})

gulp.task('js', (cb) => {
  gulpSequence('test:js', 'babel', cb)
})

gulp.task('babel', () => {
  return gulp
    .src('app/es6/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('app/js'))
})

// test
gulp.task('test', (cb) => {
  gulpSequence('test:js', cb)
})

gulp.task('test:js', () => {
  return gulp
    .src(['app/es6/**/*.js', "!app/components/**/*.js"])
    .pipe(eslint(eslintrc))
    .pipe(eslint.result( (result) => {
      console.log("# ESLint result: "+result.errorCount+" errors, "+result.warningCount+" warnings for " + result.filePath)
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})



// build
gulp.task('build', ['test'], (cb) => {
  gulpSequence('build:clean', 'build:html', cb)
})
gulp.task('build:clean',() => {
  return gulp
    .src('./dist/**', {read:false})
    .pipe(clean())
})
gulp.task('build:html',() => {
  return gulp
    .src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify({mangle: false})))
    .pipe(gulp.dest('./dist'))
})
