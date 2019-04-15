'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function minify() {
    return gulp.src('src/**/*.html')
        .pipe(plugins.minifyInline())
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest('dist'));
}
