// Dependencies
var gulp = require('gulp');
var debug = require('gulp-debug');
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * Copyright <%= new Date().getFullYear() %> <%= pkg.authors%>',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
].join('\n');

// Default
gulp.task('default', ['watch']);

// Compile less files
gulp.task('less', function() {
    var files = './src/sudoku-grid.less';

    return gulp.src(files)
        .pipe(less())
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('dist'))
        .pipe(debug({ minimal: false }));
});

// Minify CSS files
gulp.task('css', ['less'], function() {
    var files = './dist/sudoku-grid.css';

    return gulp.src(files)
        .pipe(rename(function(path) {
            path.extname = '.min.css';
        }))
        .pipe(cssnano())
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
        .pipe(debug({ minimal: false }));
});

// Watch
gulp.task('watch', ['css'], function() {
    var files = './src/sudoku-grid.less';

    gulp.watch(files, ['css']);
});
