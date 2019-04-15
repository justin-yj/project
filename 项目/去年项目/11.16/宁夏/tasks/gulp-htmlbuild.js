gulp.task('build', function() {
    gulp.src(['./index.html'])
        .pipe(htmlbuild({
            // build js with preprocessor 
            js: htmlbuild.preprocess.js(function(block) {
                // read paths from the [block] stream and build them 
                // then write the build result path to it 
                block.write('buildresult.js');
                block.end();

            })
        }))
        .pipe(gulp.dest('./dist'));
});
