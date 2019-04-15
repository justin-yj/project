'use strict';

var gulp = require('gulp');
//压缩html文件，包括在html中写的css和js
var htmlmin = require('./gulp-htmlmin');
//压缩css文件
var cssmin = require('./gulp-cssmin');
//压缩js文件
var jsmin = require('./gulp-jsmin');

module.exports = function watch() {
	gulp.watch('src/**/*.html', htmlmin);
	gulp.watch('src/**/*.css', cssmin);
	gulp.watch('src/**/*.js', jsmin);
};
