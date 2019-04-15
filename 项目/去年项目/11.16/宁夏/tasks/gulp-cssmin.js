'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function minifyCss() {
    return gulp.src(['src/**/*.css'])
    	.pipe(plugins.concat("./styles/index.css"))
        .pipe(plugins.rev())
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.rev.manifest('build/assets/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest('./'));
}
