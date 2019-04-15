var gulp = require("gulp"),
	browserSync = require("browser-sync").create(),
	reload = function() {
		browserSync.reload();
	},
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer");
	


/*引入公共头部 底部*/
var fileinclude = require('gulp-file-include');
/*路径*/
var flatten = require('gulp-flatten');
/*压缩图片*/
var imagemin = require('gulp-imagemin');
/*删除*/
var del = require('del');
/*es6转es5*/
var babel = require("gulp-babel");
/*不终止进程*/
var plumber = require('gulp-plumber');
/*路径*/
var src = {
	src: 'src/',
	scss: 'src/scss/**/*scss',
	html: 'src/**/*.html',
	js: 'src/js/**/*.js'
}
/*监听*/
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
			index: 'index.html'
		},
		open: 'external',
		prot: 8080
	});
	gulp.watch(src.js).on('change', function() {
		del(['dist/js/**/*']);
		reload();
		gulp.src(['src/js/**/*'])
			.pipe(plumber())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest('dist/js'))
	});
	gulp.watch('src/images/**/*').on('change', function() {
		del(['dist/images/**/*']);
		reload();
		gulp.src(['src/images/**/*'])
			.pipe(gulp.dest('dist/images'))
	});
	gulp.watch('src/fonts/**/*').on('change', function() {
		del(['dist/fonts/**/*']);
		reload();
		gulp.src(['src/fonts/**/*'])
			.pipe(gulp.dest('dist/fonts'))
	});

	gulp.watch('src/lib/**/*').on('change', function() {
		del(['dist/lib/**/*']);
		reload();
		gulp.src(['src/lib/**/*'])
			.pipe(gulp.dest('dist/lib'))
	});
	gulp.watch('src/include/**/*').on('change', function() {
		del(['dist/include/**/*']);
		reload();
		gulp.src(['src/include/**/*'])
			.pipe(gulp.dest('dist/include'))
	});
	gulp.watch(src.html).on('change', function() {
		del(['dist/include/**/*']);
		reload();
		gulp.src(src.html)
			.pipe(fileinclude({
				prefix: '@@',
				basepath: '@file'
			}))
			.pipe(gulp.dest('dist'));
	});
	gulp.watch(src.scss).on('change', function() {
		del(['dist/css/**/*']);
		del(['src/css/**/*']);
		gulp.src(src.scss)
			.pipe(flatten())
			.pipe(sass({
				outputStyle: 'expanded'
			}).on('error', sass.logError))
			.pipe(autoprefixer('>5%'))
			.pipe(gulp.dest('dist/css'))
			.pipe(gulp.dest('src/css'));
		reload();
	})
});
/*编译css*/
gulp.task('sass', function() {
	del(['dist/css/**/*']);
	del(['src/css/**/*']);
	gulp.src(src.scss)
		.pipe(flatten())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer('>5%'))
		.pipe(gulp.dest('dist/css'))
		.pipe(gulp.dest('src/css'));

})
/*引入头部底部*/
gulp.task('fileinclude', function() {
	del(['dist/include/**/*']);
	reload();
	gulp.src(src.html)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist'));
});

/*复制图片*/
gulp.task('copy-images', function() {
	del(['dist/images/**/*']);
	gulp.src(['src/images/**/*'])
		.pipe(flatten())
		/*压缩图片*/
		/*.pipe(imagemin())*/
		.pipe(gulp.dest('dist/images'))
	reload();
});

gulp.task('copy-fonts', function() {
	del(['dist/fonts/**/*']);
	gulp.src(['src/fonts/**/*'])
		.pipe(flatten())
		.pipe(gulp.dest('dist/fonts'))
	reload();

});
gulp.task('copy-lib', function() {
	del(['dist/lib/**/*']);
	gulp.src(['src/lib/**/*'])
		.pipe(flatten())

		.pipe(gulp.dest('dist/lib'))
	reload();
});
gulp.task('copy-include', function() {
	del(['dist/include/**/*']);
	gulp.src(['src/include/**/*'])
		.pipe(flatten())
		.pipe(gulp.dest('dist/include'))
	reload();
});
gulp.task('copy-js', function() {
	del(['dist/js/**/*']);
	gulp.src(['src/js/**/*'])
		.pipe(plumber())
		.pipe(flatten())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/js'))
	reload();
});

gulp.task('default', ['server', 'sass', 'fileinclude', 'copy-images', 'copy-fonts', 'copy-lib', 'copy-js', 'copy-include'], function() {
	console.log("任务已执行，在8080端口！");
})