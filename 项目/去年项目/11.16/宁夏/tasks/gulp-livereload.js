'use strict';

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

module.exports = function livereload() {
	return plugins.connect.server({
		root: 'dist',
		livereload: true,
		port: 9001
	});
};
