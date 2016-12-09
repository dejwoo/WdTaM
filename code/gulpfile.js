'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var puglint = require('gulp-pug-lint');
var uncss = require('gulp-uncss');
var nano = require('gulp-cssnano');
var pump = require('pump');
var htmlbeautify = require('gulp-html-beautify');
var responsive = require('gulp-responsive');
var responsiveConfig = require('gulp-responsive-config');
var htmlv = require('gulp-html-validator');
var foreach = require('gulp-foreach');

var BUILD_PATH = "./../build";
var DIST_PATH = "./../dist";

var paths = {
    scripts: ['public/js/*.js'],
    images: ['public/media/**/*'],
    styles: ['public/stylesheets/**/*.[sass,scss]'],
    views: ['views/**/*.pug'],
    controllers: ['controllers/**/*.js'],
    models: ['models/**/*.js']
};

// Lint Task
gulp.task('lint', function () {
    return gulp.src(paths.scripts + paths.controllers + paths.models + ['./app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src(paths.styles)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(uncss({
            html: [BUILD_PATH + '/**/*.html', DIST_PATH + '/**/*.html']
        }))
        .on('error', function (error) {
            console.log(error)
        })
        .pipe(nano())
        .pipe(gulp.dest(DIST_PATH + '/assets/css'))
        .pipe(browserSync.stream({match: 'public/stylesheets/**/*.css'}));
    //.pipe(concat('main.css'))
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH + '/assets/js'))

});

// gulp.task('images', ['views'], function () {
//     var config = responsiveConfig([
//         'dist/**/*.html'
//     ]);
//     return gulp.src(paths.images)
//         .pipe(responsive(config, {
//             errorOnEnlargement: false,
//             quality: 80,
//             withMetadata: false,
//             compressionLevel: 7
//         }))
//         .pipe(gulp.dest('public/media'));
// });


gulp.task('views', function () {
    return gulp.src(paths.views)
        .pipe(pug())
        .pipe(htmlbeautify())
        .pipe(foreach(function (stream, file) {
            return stream
                .pipe(htmlv({format: 'html'}))
        }))
        .pipe(gulp.dest(DIST_PATH))
});

// give nodemon time to restart
gulp.task('bs-delay', function () {
    setTimeout(function () {
        browserSync.reload({stream: false});
    }, 1000);
});


gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: './bin/www',
        ext: 'js',
        ignore: ['public/**/*.js'],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'appname:*'
        }
    }).on('start', function () {
        //avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    })
        .on('crash', function () {
            // console.log('nodemon.crash');
        })
        .on('restart', function () {
            // console.log('nodemon.restart');
        })
        .once('quit', function () {
            // handle ctrl+c without a big weep
            process.exit();
        });
});
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        port: 4000
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(paths.views, browserSync.reload);
    gulp.watch(paths.scripts, browserSync.reload);
    gulp.watch(paths.styles, ['sass']);
    gulp.watch('./public/**/*.css', browserSync.reload);
    gulp.watch(['./controllers/**/*.js', './app.js', './bin/www'], ['bs-delay']);
});

gulp.task('default', ['watch']);

