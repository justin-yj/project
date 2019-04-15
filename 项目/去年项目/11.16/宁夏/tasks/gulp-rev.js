'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function revision() {
    //读取 rev-manifest.json 文件以及需要进行css名替换的文件
    return gulp.src(['build/assets/*.json', 'src/**/*.html', 'dist/**/*.css'])
        .pipe(plugins.revCollector({
        	replaceReved:true
        }))
        .pipe(plugins.minifyInline())
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest('dist'));
};
