'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var plugins = require('gulp-load-plugins')();

module.exports = function uglifyJs() {
    return gulp.src(['src/lib/**/*.js', 'src/script/**/*.js'])
    	.pipe(uglify())
    	.pipe(plugins.concat("./script/index.js"))
    	.pipe(plugins.rev())
    	.pipe(gulp.dest('dist'))
    	.pipe(plugins.rev.manifest('build/assets/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest('./'));
}
