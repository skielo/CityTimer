var gulp = require('gulp');
var del = require('del');


gulp.task('moveFonts', function() {
    return gulp.src(['./website/public/*.woff', './website/public/*.woff2', './website/public/*.ttf'])
        .pipe(gulp.dest('website/public/fonts/'));
});

gulp.task('cleanConcat', function() {
    return del('website/public/app/concat.js', { force: true });
});

gulp.task('cleanupBuild', ['cleanConcat', 'moveFonts'], function() {

});