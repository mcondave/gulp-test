var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

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
    })
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
    }))
});
