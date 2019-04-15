'use strict';
var gulp = require('gulp');
var rjs = require('gulp-requirejs-optimize');

module.exports = function amdOptimize() {
    return gulp.src('src/scripts/index.js')
        .pipe(rjs(function() {
            return {
                mainConfigFile: 'src/scripts/index.js'
            }
        }))
        .pipe(gulp.dest('dist/scripts/'));
}
