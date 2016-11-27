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
var browserify = require('browserify');
var transform = require('vinyl-transform');
var gulpPugBeautify = require('gulp-pug-beautify');
var pug = require('gulp-pug');

reload = browserSync.reload;

// Lint Task
gulp.task('lint', function () {
    return gulp.src('public/javascripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('public/stylesheets/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets/css'))
        .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('views', function (done) {
    return gulp.src('views/**.pug')
        .pipe(pug())
        .pipe(gulpPugBeautify({omit_empty: true}))
        .pipe(gulp.dest('./public'))
        .on('end', done)
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

gulp.task('default', ['browser-sync', 'sass'], function () {
    gulp.watch('./views/**/*.pug', browserSync.reload);
    gulp.watch('./public/**/*.js', browserSync.reload);
    gulp.watch('./public/**/*.css', browserSync.reload);
    gulp.watch(['./routes/**/*.js', './app.js', './bin/www'], ['bs-delay']);
});
