var gulp = require('gulp');
var outputRoot = 'website/public/';
var del = require('del');

// deletes all files in the output path
gulp.task('clean', function() {
    var src = [outputRoot + '*'];
    return del(src, { force: true });
});