'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function imageMin() {
    return gulp.src('src/images/**/*')
        .pipe(plugins.imagemin({
        	progressive:true
        }))
        .pipe(plugins.rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(plugins.rev.manifest('build/assets/rev-manifest.json',{
            merge: true
        }))
        .pipe(gulp.dest('./'));
}
