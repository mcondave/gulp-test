var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'], callback);
});

gulp.task('build', function (callback) {
    runSequence(
        'clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    );
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
	    baseDir: 'app'
	},
    });
});

gulp.task('hello', function() {
    console.log('Hello mcon');
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Get source files with gulp.src
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css')) // Outputs the file in the destination folder
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        // Setting interlaced to true
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback);
});