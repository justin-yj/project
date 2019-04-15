'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function openBrowser(){
	return gulp.src('./dist/').pipe(plugins.open({uri:'http://localhost:9001'}));
}