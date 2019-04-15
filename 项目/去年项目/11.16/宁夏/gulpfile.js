'use strict';

var gulp = require('gulp');
//清空已经生成的项目
var clean = require('./tasks/gulp-clean');
//压缩html文件，包括在html中写的css和js
var htmlmin = require('./tasks/gulp-htmlmin');
//压缩css文件
var cssmin = require('./tasks/gulp-cssmin');
//压缩js文件
var jsmin = require('./tasks/gulp-jsmin');
var livereload = require('./tasks/gulp-livereload');
var watch = require('./tasks/gulp-watch');
var open = require('./tasks/gulp-open');
var imagemin = require('./tasks/gulp-image');

var amd = require('./tasks/gulp-require.js');
var plugins = require('gulp-load-plugins')();


gulp.task('movecss', function() {
    return gulp.src(['src/**/*.json', 'src/Proxy.ashx', 'src/**/*.ico'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', clean);

gulp.task('deploy', gulp.series(
    'clean',
    gulp.parallel(htmlmin, cssmin, jsmin)
));

gulp.task('serve',
    gulp.parallel(watch, livereload, open)
);

gulp.task('minify', function() {
    return gulp.src('src/**/*.html')
        .pipe(plugins.usemin({
            html: [plugins.minifyHtml],
            css: [plugins.minifyCss, plugins.rev],
            js: [plugins.uglify, plugins.rev]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('revision', function() {
    return gulp.src(['build/assets/*.json', 'dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js', '!dist/lib/*.js'])
        .pipe(plugins.revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
    gulp.src('src').pipe(plugins.webserver({
        livereload: true,
        open: true
    }));
    gulp.start('watch');
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/scripts/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['images']);
    plugins.livereload.listen();
    gulp.watch(['dist/**']).on('change', plugins.livereload.changed);
});

gulp.task('build', gulp.series(
    'clean',
    gulp.series('minify', imagemin, 'movecss'),
    'revision'
));
