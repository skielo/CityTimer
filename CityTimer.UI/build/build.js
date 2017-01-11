var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean', ['set-prod-node-env', 'assets'],
        callback
    );
});