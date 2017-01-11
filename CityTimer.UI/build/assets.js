var mainBowerFiles = require('main-bower-files');
var gnf = require('gulp-npm-files');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_sourcemaps = require('gulp-sourcemaps');
var recursiveFolder = require('gulp-recursive-folder');
var pump = require('pump');
var del = require('del');
var paths = [
    './src/app/app.module.js',
    './src/app/auth/auth.module.js',
    './src/app/auth/config.route.js',
    './src/app/auth/auth.controller.js',
    './src/app/auth/auth.service.js',
    './src/app/auth/authForm.directive.js',
    './src/app/landing/landing.module.js',
    './src/app/landing/config.route.js',
    './src/app/citytimer/cityTimer.module.js',
    './src/app/citytimer/config.route.js',
    './src/app/citytimer/cityTimer.controller.js',
    './src/app/citytimer/directives/requestForm.directive.js',
    './src/app/citytimer/directives/requestTable.directive.js',
    './src/app/core/core.module.js',
    './src/app/core/constants.js',
    './src/app/core/firebaseData.service.js',
    './src/app/core/cityTimer.service.js',
    './src/app/core/ngAutocomplete.js',
    './src/app/layout/layout.module.js',
    './src/app/layout/navbar.directive.js',
    './src/app/alert/alert.module.js',
    './src/app/alert/alert.controller.js',
    './src/app/alert/directives/alert.directive.js',
];
var pathsHtml = [
    './src/app/auth/*.html',
    './src/app/landing/*.html',
    './src/app/layout/*.html',
    './src/app/alert/directives/*.html',
    './src/app/citytimer/*.html',
    './src/app/citytimer/directives/*.html'
];

gulp.task('content', function() {
    return gulp.src('src/content/**/*')
        .pipe(gulp.dest('website/public/content/'));
});

//gulp.task('app', function() {
//    return gulp.src('src/app/**/*')
//        .pipe(gulp.dest('website/public/app/'));
//});
gulp.task('compress', function(cb) {
    pump([
            gulp.src(paths),
            gp_sourcemaps.init(),
            gp_concat('concat.js'),
            gulp.dest('website/public/app/'),
            gp_rename('app.min.js'),
            uglify(),
            gp_sourcemaps.write('./'),
            gulp.dest('website/public/app/')
        ],
        cb
    );
});

gulp.task('htmlFiles', function() {
    return gulp.src(pathsHtml, { base: './src/app/' })
        .pipe(gulp.dest('website/public/app/'));
});

gulp.task('indexFile', function() {
    return gulp.src('./src/index.base.html')
        .pipe(gp_rename('index.html'))
        .pipe(gulp.dest('website/public/'));
});

gulp.task('npmDependency', function() {
    return gulp.src(['./src/node_modules/angular-bootstrap-datetimepicker/src/js/*.js', './src/node_modules/angular-bootstrap-datetimepicker/src/css/*.css'])
        .pipe(gulp.dest('website/public/node_modules/'));
});

gulp.task('bower-files', function() {
    gulp.src(mainBowerFiles({
            paths: {
                bowerDirectory: 'src/bower_components',
                bowerJson: 'src/bower.json'
            }
        }))
        .pipe(gulp.dest("website/public/vendors"));
});

gulp.task('moveFonts', ['compress'], function() {
    return gulp.src(['./website/public/vendors/fontawesome-webfont.woff', './website/public/vendors/glyphicons-halflings-regular.woff', './website/public/vendors/glyphicons-halflings-regular.woff2', './website/public/vendors/glyphicons-halflings-regular.ttf'])
        .pipe(gulp.dest('website/public/fonts/'));
});

gulp.task('copyNpmDependenciesOnly', function() {
    gulp
        .src(gnf(null, './src/package.json'), { base: './' })
        .pipe(gulp.dest('website/public/node_modules'));
});

gulp.task('cleanConcat', function() {
    return del('website/public/app/concat.js', { force: true });
});

gulp.task('assets', ['content', 'compress', 'bower-files', 'npmDependency', 'htmlFiles', 'indexFile', 'moveFonts'], function() {

});