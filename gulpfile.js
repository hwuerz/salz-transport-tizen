// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var runSequence = require('run-sequence');

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var distFolder = 'dist';
var appFolder = 'app';

var sassFiles = [
    'lib/tau/wearable/theme/default/tau.min.css',
    'lib/tau/wearable/theme/default/tau.circle.min.css',
    'sass/*.scss'
];

var jsLibs = [
    'lib/tau/wearable/js/tau.min.js',
    'lib/*.js'
];

var htmlFiles = [
    'html/*.html'
];

var tizenFiles = [
    'config.xml',
    'icon.png',
    'index.html'
];

var imageFiles = [
    'lib/tau/wearable/theme/blue/images/**/*.png'
];

gulp.task('clean', function() {
    return del([ appFolder, distFolder ]);
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp
        .src(sassFiles)
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(appFolder));
});

// Concatenate & Minify JS Libs
gulp.task('scripts', function() {
    return gulp
        .src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(appFolder));
});

// Copy html files
gulp.task('html', function() {
    return gulp.src(htmlFiles)
        .pipe(gulp.dest(appFolder + '/html'));
});

// Copy config files
gulp.task('tizen', function() {
    return gulp.src(tizenFiles)
        .pipe(gulp.dest(appFolder));
});

// Copy images files
gulp.task('images', function() {
    return gulp.src(imageFiles)
        .pipe(gulp.dest(appFolder + '/images'));
});


gulp.task("typescript", function () {
    return browserify({
        entries: ['js/app.ts']
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(appFolder));
});

// Minify and uglify files in appFolder to distFolder
gulp.task('dist', [], function() {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    return gulp.src(appFolder + '/**/*')
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        .pipe(cleanCSS())
        .pipe(cssFilter.restore)

        .pipe(gulp.dest(distFolder));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsLibs, ['scripts']);
    gulp.watch(htmlFiles, ['html']);
    gulp.watch(tizenFiles, ['tizen']);
    gulp.watch(['js/**/*.ts'], ['typescript']);
});

// Build the full app
gulp.task('build', ['sass', 'scripts', 'html', 'tizen', 'images', 'typescript']);

// Build the full app for deployment
gulp.task('build-dist', function(done) {
    runSequence(/*'clean',*/ 'build', 'dist', function() {
        done();
    });
});

// Default Task
gulp.task('default', ['build', 'watch']);